'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/style'

// Chuyển động nghiêng/đung đưa theo con trỏ, tách từ HoloCard (React Bits) – bỏ lớp foil WebGL.
// Lò xo cùng thông số với HoloCard: nghiêng 150/16, phóng to 320/30.
const PERSPECTIVE = 1100

type TiltCardProps = {
  children: ReactNode
  tiltMax?: number
  hoverScale?: number
  className?: string
}

type Spring = { value: number; velocity: number }

// Cập nhật tại chỗ thay vì `[state.x, state.vx] = spring(...)`: minifier SWC khi build production
// gộp nhầm phép gán destructuring vào thuộc tính object thành `[0,0]=…` (lỗi cú pháp, vỡ cả trang).
const stepSpring = (s: Spring, target: number, stiffness: number, damping: number, dt: number) => {
  s.velocity += ((target - s.value) * stiffness - s.velocity * damping) * dt
  s.value += s.velocity * dt
}

export function TiltCard({ children, tiltMax = 14, hoverScale = 1.04, className }: TiltCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const rotorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const rotor = rotorRef.current
    if (!root || !rotor) return
    // Giảm chuyển động / màn hình cảm ứng: giữ thẻ phẳng
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pointer = { x: 0.5, y: 0.5, inside: false }
    const rotX: Spring = { value: 0, velocity: 0 }
    const rotY: Spring = { value: 0, velocity: 0 }
    const lift: Spring = { value: 1, velocity: 0 }
    let raf = 0
    let last = 0

    const tick = (now: number) => {
      raf = 0
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000))
      last = now
      const targetX = pointer.inside ? (0.5 - pointer.y) * 2 * tiltMax : 0
      const targetY = pointer.inside ? (pointer.x - 0.5) * 2 * tiltMax : 0
      const targetLift = pointer.inside ? hoverScale : 1

      const steps = Math.ceil(dt / (1 / 240))
      const h = dt / steps
      for (let i = 0; i < steps; i++) {
        stepSpring(rotX, targetX, 150, 16, h)
        stepSpring(rotY, targetY, 150, 16, h)
        stepSpring(lift, targetLift, 320, 30, h)
      }
      rotor.style.transform = `perspective(${PERSPECTIVE}px) scale(${lift.value}) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg)`

      const motion =
        Math.abs(rotX.velocity) + Math.abs(rotY.velocity) + Math.abs(lift.velocity) * 40 +
        Math.abs(rotX.value - targetX) + Math.abs(rotY.value - targetY) + Math.abs(lift.value - targetLift) * 40
      if (motion > 0.02) raf = requestAnimationFrame(tick)
      else if (!pointer.inside) rotor.style.transform = ''
    }

    const wake = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = root.getBoundingClientRect()
      pointer.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      pointer.y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      pointer.inside = true
      wake()
    }
    const onLeave = () => {
      pointer.inside = false
      wake()
    }

    // lắng nghe trên khung ngoài (không xoay) để toạ độ con trỏ không bị lệch theo độ nghiêng
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [tiltMax, hoverScale])

  return (
    // hover:z-10: thẻ phóng to nằm trên thẻ bên cạnh
    <div ref={rootRef} className={cn('relative hover:z-10', className)}>
      <div ref={rotorRef} className="flex w-full will-change-transform">
        {children}
      </div>
    </div>
  )
}
