import { photos, type ImageAsset } from '@/data/photos'

// Bộ sưu tập trang chủ – 30 ảnh.
// 7 ảnh đầu hiện trên lưới 5 cột (đã chọn theo hướng ảnh để vừa từng ô: dọc cao / dọc thấp / ngang);
// các ảnh sau được bốc ngẫu nhiên một lần (seed cố định) từ thư viện, đã loại ảnh review/collage,
// và mở bằng nút "Xem thêm".
export const GALLERY_PREVIEW_COUNT = 7

export const galleryCollection: ImageAsset[] = [
  // Lưới xem trước – thứ tự khớp với các ô trong components/home/GalleryPreview.tsx
  photos.pinkAltarBride, // cột 1 – trên (dọc)
  photos.confettiCeremony, // cột 1 – dưới (ngang)
  photos.vuQuyPetals, // cột 2 (dọc cao)
  photos.ringCeremony, // cột giữa (dọc thấp)
  photos.aoDaiFlowerArch, // cột 4 (dọc cao)
  photos.aoDaiFanPortrait, // cột 5 – trên (dọc)
  photos.palaceWindows, // cột 5 – dưới (ngang)
  // Xem thêm
  photos.gardenCheers,
  photos.redProcession,
  photos.studioSweet,
  photos.familyHug,
  photos.monochromeKiss,
  photos.studioPuppy,
  photos.dreamyVeil,
  photos.vintageCarBridesmaids,
  photos.teaCeremonyTable,
  photos.studioSeatedLaugh,
  photos.sunlitLaugh,
  photos.studioBench,
  photos.redCouple,
  photos.gardenBackdrop,
  photos.bridesmaidsAoDai,
  photos.palaceStairsWide,
  photos.sunlightWall,
  photos.vuQuyRedPortrait,
  photos.redAoDaiSmile,
  photos.churchVeil,
  photos.churchCelebration,
  photos.studioWhiteJacket,
  photos.studioForeheadKiss,
]
