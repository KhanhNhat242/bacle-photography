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
import palaceStaircase from '@/public/images/library/819483968_122176307210985766_7241966598668351217_n.jpg'
import forestKiss from '@/public/images/library/800925445_122174860106985766_5335083525858304400_n.jpg'
import forestPlayful from '@/public/images/library/805980793_122174856140985766_8912611405759166584_n.jpg'
import aoDaiFlowerArch from '@/public/images/library/855061761_122180260544985766_6412325273328708526_n.jpg'
import familyHug from '@/public/images/library/797648631_122176115906985766_7164044039985298308_n.jpg'
import monochromeKiss from '@/public/images/library/543173574_122110827866985766_8753897004450364073_n.jpg'
import studioPuppy from '@/public/images/library/825266717_122177058776985766_6386068407875164852_n.jpg'
import dreamyVeil from '@/public/images/library/841687865_122178899636985766_4253491114991353932_n.jpg'
import vintageCarBridesmaids from '@/public/images/library/834419199_122178048224985766_8293537214393177684_n.jpg'
import teaCeremonyTable from '@/public/images/library/849508341_122180260670985766_1312458487052449313_n.jpg'
import studioSeatedLaugh from '@/public/images/library/849536955_122179711898985766_539010098780033237_n.jpg'
import aoDaiFanPortrait from '@/public/images/library/853627165_122180260736985766_308394949032287603_n.jpg'
import studioBench from '@/public/images/library/848979224_122179711844985766_8827485687177572665_n.jpg'
import gardenBackdrop from '@/public/images/library/828712548_122177432042985766_938532801495982004_n.jpg'
import bridesmaidsAoDai from '@/public/images/library/820526002_122176446434985766_4821982536453442204_n.jpg'
import palaceStairsWide from '@/public/images/library/819300760_122176278566985766_4004343990801554696_n.jpg'
import vuQuyRedPortrait from '@/public/images/library/841031447_122179315502985766_8435978089457157532_n.jpg'
import redAoDaiSmile from '@/public/images/library/843242288_122179310492985766_4682374475888425730_n.jpg'
import churchVeil from '@/public/images/library/833313904_122177916572985766_8023779917759797400_n.jpg'
import churchCelebration from '@/public/images/library/841398071_122179108592985766_4310454375037404420_n.jpg'
import studioWhiteJacket from '@/public/images/library/825267522_122178234218985766_6282745370719680158_n.jpg'

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
  palaceStaircase: { src: palaceStaircase, alt: 'Cô dâu chú rể trên cầu thang lâu đài dưới đèn chùm pha lê', position: '50% 55%' },
  forestKiss: { src: forestKiss, alt: 'Cặp đôi hôn nhau giữa khu rừng xanh ngập nắng', position: '55% 70%' },
  forestPlayful: { src: forestPlayful, alt: 'Cô dâu chú rể vui đùa tạo dáng giữa rừng cây' },
  aoDaiFlowerArch: { src: aoDaiFlowerArch, alt: 'Chú rể vest đen trao hoa cho cô dâu áo dài trắng bên cổng hoa', position: '50% 25%' },
  familyHug: { src: familyHug, alt: 'Cô dâu áo dài đỏ ôm người thân trong lễ gia tiên', position: '55% 35%' },
  monochromeKiss: { src: monochromeKiss, alt: 'Ảnh đen trắng cặp đôi hôn nhau', position: '45% 30%' },
  studioPuppy: { src: studioPuppy, alt: 'Cô dâu ôm cún nhỏ ngồi cạnh chú rể trong studio hoa cỏ', position: '50% 50%' },
  dreamyVeil: { src: dreamyVeil, alt: 'Cô dâu trong ánh sáng mờ ảo nhìn về phía xa', position: '50% 25%' },
  vintageCarBridesmaids: { src: vintageCarBridesmaids, alt: 'Cô dâu và phù dâu áo dài hồng bên xe cổ trước nhà', position: '50% 60%' },
  teaCeremonyTable: { src: teaCeremonyTable, alt: 'Cô dâu chú rể bên bàn tiệc trà ngập hoa hồng', position: '50% 45%' },
  studioSeatedLaugh: { src: studioSeatedLaugh, alt: 'Cô dâu chú rể ngồi cười rạng rỡ trên phông trắng', position: '55% 50%' },
  aoDaiFanPortrait: { src: aoDaiFanPortrait, alt: 'Cô dâu áo dài trắng cầm quạt tròn mỉm cười', position: '50% 25%' },
  studioBench: { src: studioBench, alt: 'Cô dâu đứng, chú rể ngồi trên ghế đen trong studio trắng', position: '50% 55%' },
  gardenBackdrop: { src: gardenBackdrop, alt: 'Cặp đôi đứng giữa phông vải trắng và hoa trong vườn', position: '50% 40%' },
  bridesmaidsAoDai: { src: bridesmaidsAoDai, alt: 'Cô dâu áo dài đỏ cùng các phù dâu áo dài trắng', position: '50% 50%' },
  palaceStairsWide: { src: palaceStairsWide, alt: 'Cặp đôi dưới chân cầu thang xoắn trong sảnh cổ điển', position: '55% 55%' },
  vuQuyRedPortrait: { src: vuQuyRedPortrait, alt: 'Cô dâu áo dài đỏ mỉm cười bên bảng lễ vu quy', position: '45% 30%' },
  redAoDaiSmile: { src: redAoDaiSmile, alt: 'Cô dâu áo dài đỏ tóc dài cười tươi', position: '50% 30%' },
  churchVeil: { src: churchVeil, alt: 'Cô dâu voan ren ngồi cạnh chú rể trong nhà thờ', position: '50% 35%' },
  churchCelebration: { src: churchCelebration, alt: 'Khách mời chúc mừng cô dâu chú rể bước ra từ nhà thờ', position: '50% 55%' },
  studioWhiteJacket: { src: studioWhiteJacket, alt: 'Chú rể áo vest trắng cười bên cô dâu cầm hoa', position: '50% 25%' },
} satisfies Record<string, ImageAsset>
