// Danh mục ảnh dùng trên website. Tên file trong thư viện là tên gốc từ Facebook (H7),
// nên mọi nơi chỉ tham chiếu ảnh qua khoá có nghĩa ở đây.
import type { StaticImageData } from 'next/image'

import sunlitLaugh from '@/public/images/library/830199188_122177550140985766_2392480344417914744_n.jpg'
import sunlightWall from '@/public/images/library/830487932_122177548790985766_4393751367731074538_n.jpg'
import sunlitSit from '@/public/images/library/825266928_122177548850985766_2194864665654054462_n.jpg'
import gardenTable from '@/public/images/library/825282036_122177432150985766_7294955940929971572_n.jpg'
import gardenCheers from '@/public/images/library/830859132_122177432390985766_2127378804826157890_n.jpg'
import studioWarmHug from '@/public/images/library/825351388_122178234086985766_8288296970018479188_n.jpg'
import studioForeheadKiss from '@/public/images/library/799364406_122175218762985766_4318958767665634043_n.jpg'
import studioClassic from '@/public/images/library/820344572_122176405100985766_4152158571787176034_n.jpg'
import studioHands from '@/public/images/library/821468805_122176405070985766_4168569306006193069_n.jpg'
import studioEmbrace from '@/public/images/library/823153462_122176405088985766_537393157150163687_n.jpg'
import studioSweet from '@/public/images/library/847747686_122179712132985766_7819420576926293420_n.jpg'
import ringTouch from '@/public/images/library/843324470_122178899684985766_3808870765401083845_n.jpg'
import ringExchange from '@/public/images/library/832994587_122177916764985766_9156660978554569994_n.jpg'
import ringCeremony from '@/public/images/library/844630132_122180260820985766_7545271105787651622_n.jpg'
import redAoDaiEnvelopes from '@/public/images/library/820526024_122176446278985766_6935237903911184319_n.jpg'
import redEnvelopesFan from '@/public/images/library/844344129_122179310852985766_7474427790917848219_n.jpg'
import redCouple from '@/public/images/library/816156938_122176116020985766_8406461578803709036_n.jpg'
import redProcession from '@/public/images/library/823196629_122176446356985766_4734821017757562614_n.jpg'
import confettiCeremony from '@/public/images/library/796401775_122176115972985766_6259989714793711875_n.jpg'
import vuQuyPetals from '@/public/images/library/844979264_122179312100985766_2742375450208842226_n.jpg'
import pinkAltarBride from '@/public/images/library/814364955_122175668090985766_6028730267571484477_n.jpg'
import veilPortrait from '@/public/images/library/833045068_122177916458985766_6548770774937579323_n.jpg'
import palaceWindows from '@/public/images/library/819051399_122176276718985766_35069523750258317_n.jpg'

export type ImageAsset = {
  src: StaticImageData
  alt: string
  // object-position khi ảnh bị cắt khung, giữ gương mặt/tà váy trong khung hình
  position?: string
}

export const photos = {
  sunlitLaugh: { src: sunlitLaugh, alt: 'Cô dâu chú rể cười rạng rỡ dưới nắng ngược sáng', position: '50% 22%' },
  sunlightWall: { src: sunlightWall, alt: 'Cặp đôi tựa tường trong nắng sớm, bóng lá in trên tường' },
  sunlitSit: { src: sunlitSit, alt: 'Cặp đôi ngồi cười đùa dưới nắng chiều' },
  gardenTable: { src: gardenTable, alt: 'Cặp đôi bên bàn trà giữa khu vườn xanh' },
  gardenCheers: { src: gardenCheers, alt: 'Cô dâu chú rể giơ tay reo vui giữa vườn hoa trắng', position: '50% 35%' },
  studioWarmHug: { src: studioWarmHug, alt: 'Chú rể ôm và hôn lên tóc cô dâu trong studio tông trắng', position: '50% 18%' },
  studioForeheadKiss: { src: studioForeheadKiss, alt: 'Chú rể nâng niu gương mặt cô dâu trong studio tối giản', position: '50% 25%' },
  studioClassic: { src: studioClassic, alt: 'Chú rể vest đen và cô dâu váy cúp ngực trắng trong studio' },
  studioHands: { src: studioHands, alt: 'Cặp đôi nắm tay nhìn nhau trong studio' },
  studioEmbrace: { src: studioEmbrace, alt: 'Cặp đôi ôm nhau trong studio tối giản' },
  studioSweet: { src: studioSweet, alt: 'Chú rể thơm má cô dâu trong studio trắng', position: '62% 50%' },
  ringTouch: { src: ringTouch, alt: 'Cận cảnh bàn tay cô dâu đeo nhẫn cưới', position: '50% 45%' },
  ringExchange: { src: ringExchange, alt: 'Cận cảnh khoảnh khắc trao nhẫn cưới', position: '50% 0%' },
  ringCeremony: { src: ringCeremony, alt: 'Chú rể trao nhẫn cho cô dâu áo dài trắng', position: '50% 45%' },
  redAoDaiEnvelopes: { src: redAoDaiEnvelopes, alt: 'Cô dâu chú rể áo dài đỏ cầm bao lì xì trong lễ vu quy' },
  redEnvelopesFan: { src: redEnvelopesFan, alt: 'Cặp đôi áo dài cầm quạt bao lì xì đỏ' },
  redCouple: { src: redCouple, alt: 'Cô dâu chú rể áo dài đỏ trao nhau nụ cười' },
  redProcession: { src: redProcession, alt: 'Cô dâu chú rể áo dài đỏ nắm tay bước vào lễ', position: '50% 45%' },
  confettiCeremony: { src: confettiCeremony, alt: 'Cô dâu chú rể áo dài đỏ giữa mưa hoa giấy', position: '28% 50%' },
  vuQuyPetals: { src: vuQuyPetals, alt: 'Cô dâu áo dài đỏ thổi cánh hoa trong ngày vu quy', position: '55% 25%' },
  pinkAltarBride: { src: pinkAltarBride, alt: 'Cô dâu áo dài trắng bên bàn lễ hoa hồng', position: '50% 20%' },
  veilPortrait: { src: veilPortrait, alt: 'Chân dung cô dâu đội voan ren', position: '62% 40%' },
  palaceWindows: { src: palaceWindows, alt: 'Cặp đôi trong sảnh lâu đài cổ điển với hàng cửa kính', position: '50% 60%' },
} satisfies Record<string, ImageAsset>
