import { AnimationObject } from 'lottie-react-native';

interface SendGiftItem {
  background: string;
  image: string;
}

type RenderItemProps = {
  item: SendGiftItem;
  index: number;
};

interface GiftsDataProps {
  bgColor: string;
  options: {
    path: string;
  };
  id: GiftTypes;
}

enum GiftTypes {
  Eid_1 = 'Eid_1',
  Eid_2 = 'Eid_2',
  Eid_3 = 'Eid_3',
  Eid_4 = 'Eid_4',
  Birthday_1 = 'Birthday_1',
  Birthday_2 = 'Birthday_2',
  Birthday_3 = 'Birthday_3',
  Birthday_4 = 'Birthday_4',
  Birthday_5 = 'Birthday_5',
  Congrat_1 = 'Congrat_1',
  Congrat_2 = 'Congrat_2',
  Congrat_3 = 'Congrat_3',
  Congrat_4 = 'Congrat_4',
}

// Define the interface for a single gift item
interface GiftDetails {
  bgColor: string; // Assuming bgColor is a color string
  path: AnimationObject; // Assuming path is a string (e.g., URL or file path)
  id: GiftTypes; // Assuming id is a value from GiftTypes enum
}

// Define the interface for the entire giftsCardData object
interface GiftsCardDataProps {
  eidGiftList: GiftDetails[];
  birthdayGiftList: GiftDetails[];
  congratulationsGiftList: GiftDetails[];
}

export { GiftDetails, GiftsCardDataProps, GiftsDataProps, GiftTypes, RenderItemProps, SendGiftItem };
