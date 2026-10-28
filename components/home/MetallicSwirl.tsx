'use client'

import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/style'

// Nền "kim loại lỏng xoáy" (theo ý tưởng Metallic Swirl của React Bits Pro, viết lại bằng ogl vì bản Pro
// cần license). Màu lấy từ token trong globals.css: nền cream/ivory, vân champagne, ánh bạc kem.
// Giữ độ tương phản thấp để chữ ink đặt lên trên vẫn đọc rõ.

const vertex = /* glsl */ `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBase;
uniform vec3 uLight;
uniform vec3 uMetal;
uniform vec3 uDeep;
uniform vec2 uCenter;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t = uTime * 0.045;

  // xoáy: góc xoay giảm dần theo khoảng cách tới tâm; đặt tâm lệch khỏi vùng chữ để chữ nằm trên vùng êm
  vec2 c = p - uCenter;
  c = rot(1.8 * exp(-length(c) * 1.4) + t * 0.6) * c;

  // domain warping hai lớp tạo dòng chảy kim loại
  vec2 q = vec2(fbm(c * 1.3 + t), fbm(c * 1.3 + vec2(5.2, 1.3) - t));
  vec2 w = vec2(fbm(c * 1.3 + 3.0 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(c * 1.3 + 3.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float h = fbm(c * 1.1 + 3.2 * w);

  // dải phản chiếu kim loại
  float bands = 0.5 + 0.5 * sin(h * 10.0 + w.x * 5.0);

  vec3 col = mix(uBase, uLight, smoothstep(0.25, 0.85, h));
  col = mix(col, uMetal, smoothstep(0.55, 0.98, bands) * 0.5);
  col = mix(col, uDeep, smoothstep(0.9, 1.0, 1.0 - bands) * 0.16);
  // ánh sáng gắt trên đỉnh vân – đẩy về gần trắng kem
  col = mix(col, uLight, pow(bands, 22.0) * 0.6);

  gl_FragColor = vec4(col, 1.0);
}
`

// Token màu khai báo dạng hex trong globals.css → vec3 0..1
function readColor(name: string, fallback: [number, number, number]): [number, number, number] {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const match = /^#([0-9a-f]{6})$/i.exec(value)
  if (!match) return fallback
  const n = parseInt(match[1], 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

type MetallicSwirlProps = {
  className?: string
  // tâm xoáy theo toạ độ đã chuẩn hoá: (0, 0) là giữa khung, đơn vị = chiều cao khung (x dương sang phải)
  center?: [number, number]
}

export function MetallicSwirl({ className, center = [0.35, -0.05] }: MetallicSwirlProps) {
  const [centerX, centerY] = center
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 1.5), alpha: false, antialias: false })
    const gl = renderer.gl
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.style.opacity = '0'
    canvas.style.transition = 'opacity 900ms ease'
    container.appendChild(canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uBase: { value: readColor('--ivory', [0.97, 0.945, 0.91]) },
        uLight: { value: readColor('--cream', [1, 0.992, 0.976]) },
        uMetal: { value: readColor('--accent', [0.72, 0.584, 0.416]) },
        uDeep: { value: readColor('--accent-ink', [0.498, 0.373, 0.216]) },
        uCenter: { value: [centerX, centerY] },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight]
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // bắt đầu ở một thời điểm xoáy đã "đẹp", không phải t = 0
    const offset = 40
    let raf = 0
    let visible = true
    let start = performance.now()
    let elapsed = 0

    const draw = (now: number) => {
      elapsed = (now - start) / 1000
      program.uniforms.uTime.value = offset + elapsed
      renderer.render({ scene: mesh })
      canvas.style.opacity = '1'
    }

    const loop = (now: number) => {
      draw(now)
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0
    }

    const play = () => {
      if (reduceMotion || raf || !visible || document.hidden) return
      start = performance.now() - elapsed * 1000
      raf = requestAnimationFrame(loop)
    }

    resize()
    // Giảm chuyển động: chỉ vẽ một khung tĩnh
    if (reduceMotion) draw(performance.now())
    else play()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion || !raf) draw(start + elapsed * 1000)
    })
    ro.observe(container)
    // ngừng vẽ khi hero đã cuộn khỏi màn hình hoặc tab bị ẩn
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      play()
    })
    io.observe(container)
    document.addEventListener('visibilitychange', play)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', play)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    }
  }, [centerX, centerY])

  // nền ivory hiện trước trong lúc chờ WebGL (và khi máy không hỗ trợ)
  return <div ref={containerRef} aria-hidden="true" className={cn('bg-ivory', className)} />
}
