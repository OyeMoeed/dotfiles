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
  eid: (themeColors: typeof colors) => [
    {
      bgColor: themeColors.primary.primary950,
      path: eidCard1,
      id: GiftTypes.Eid_1,
    },
    {
      bgColor: themeColors.backgrounds.yellowish,
      path: eidCard2,
      id: GiftTypes.Eid_2,
    },
    {
      bgColor: themeColors.primary.primary650,
      path: eidCard3,
      id: GiftTypes.Eid_3,
    },
    {
      bgColor: themeColors.backgrounds.lightRed,
      path: eidCard4,
      id: GiftTypes.Eid_4,
    },
  ],
  birthday: (themeColors: typeof colors) => [
    {
      bgColor: themeColors.backgrounds.lightPurple,
      path: birthdayCard1,
      id: GiftTypes.Birthday_1,
    },
    {
      bgColor: themeColors.backgrounds.mildRed,
      path: birthdayCard2,
      id: GiftTypes.Birthday_2,
    },
    {
      bgColor: themeColors.backgrounds.mildBlue,
      path: birthdayCard3,
      id: GiftTypes.Birthday_3,
    },
    {
      bgColor: themeColors.backgrounds.skin,
      path: birthdayCard4,
      id: GiftTypes.Birthday_4,
    },
    {
      bgColor: themeColors.backgrounds.yellow,
      path: birthdayCard5,
      id: GiftTypes.Birthday_5,
    },
  ],
  congrat: (themeColors: typeof colors) => [
    {
      bgColor: themeColors.backgrounds.purpleBlue,
      path: congratulationsCard1,
      id: GiftTypes.Congrat_1,
    },
    {
      bgColor: themeColors.backgrounds.mildPurple,
      path: congratulationsCard2,
      id: GiftTypes.Congrat_2,
    },
    {
      bgColor: themeColors.backgrounds.lightBlue,
      path: congratulationsCard3,
      id: GiftTypes.Congrat_3,
    },
    {
      bgColor: themeColors.backgrounds.palePink,
      path: congratulationsCard4,
      id: GiftTypes.Congrat_4,
    },
  ],
};

const darkCards: string[] = [GiftTypes.Eid_1];

export { darkCards, giftsCardData };
