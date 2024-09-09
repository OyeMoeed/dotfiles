import {
  birthdayCard1,
  birthdayCard2,
  birthdayCard3,
  birthdayCard4,
  birthdayCard5,
  congratulationsCard1,
  congratulationsCard2,
  congratulationsCard3,
  congratulationsCard4,
  eidCard1,
  eidCard2,
  eidCard3,
  eidCard4,
} from '@app/assets/lottie';
import colors from '@app/styles/colors.const';
import { GiftsCardDataProps, GiftTypes } from './send-gift-card.interface';

const giftsCardData: GiftsCardDataProps = {
  eidGiftList: [
    {
      bgColor: colors.primary.primary950,
      path: eidCard1,
      id: GiftTypes.Eid_1,
    },
    {
      bgColor: colors.backgrounds.yellowish,
      path: eidCard2,
      id: GiftTypes.Eid_2,
    },
    {
      bgColor: colors.primary.primary650,
      path: eidCard3,
      id: GiftTypes.Eid_3,
    },
    {
      bgColor: colors.backgrounds.lightRed,
      path: eidCard4,
      id: GiftTypes.Eid_4,
    },
  ],
  birthdayGiftList: [
    {
      bgColor: colors.backgrounds.lightPurple,
      path: birthdayCard1,
      id: GiftTypes.Birthday_1,
    },
    {
      bgColor: colors.backgrounds.mildRed,
      path: birthdayCard2,
      id: GiftTypes.Birthday_2,
    },
    {
      bgColor: colors.backgrounds.mildBlue,
      path: birthdayCard3,
      id: GiftTypes.Birthday_3,
    },
    {
      bgColor: colors.backgrounds.skin,
      path: birthdayCard4,
      id: GiftTypes.Birthday_4,
    },
    {
      bgColor: colors.backgrounds.yellow,
      path: birthdayCard5,
      id: GiftTypes.Birthday_5,
    },
  ],
  congratulationsGiftList: [
    {
      bgColor: colors.backgrounds.purpleBlue,
      path: congratulationsCard1,
      id: GiftTypes.Congrat_1,
    },
    {
      bgColor: colors.backgrounds.mildPurple,
      path: congratulationsCard2,
      id: GiftTypes.Congrat_2,
    },
    {
      bgColor: colors.backgrounds.lightBlue,
      path: congratulationsCard3,
      id: GiftTypes.Congrat_3,
    },
    {
      bgColor: colors.backgrounds.palePink,
      path: congratulationsCard4,
      id: GiftTypes.Congrat_4,
    },
  ],
};

export default giftsCardData;
