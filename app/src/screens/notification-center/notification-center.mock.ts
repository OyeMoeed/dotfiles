import icons from "@app/assets/icons";
import { Notification } from "./notification-center.interface";


  export const notifications: Notification[] = [
    {
      id: '1',
      discountMessage: 'You received a Gift',
      transferMessage: 'Abdullah Ahmed has sent you a gift',
      date: '14/03/2024 - 15:30',
      icon: icons.gift, // Assuming you have a gift icon
      isRead: false,
    },
    {
      id: '2',
      discountMessage: 'Get %15 Off on international transfer fees',
      transferMessage: 'You can now send an international transfer using AlinmaPay App',
      date: '14/03/2024 - 15:30',
      icon: icons.ticket_discount,
      isRead: true,
    },
    {
      id: '3',
      discountMessage: 'Get %15 Off on international transfer fees',
      transferMessage: 'You can now send an international transfer using AlinmaPay App',
      date: '14/03/2024 - 15:30',
      icon: icons.ticket_discount,
      isRead: true,
    },
    {
      id: '4',
      discountMessage: 'Get %15 Off on international transfer fees',
      transferMessage: 'You can now send an international transfer using AlinmaPay App',
      date: '14/03/2024 - 15:30',
      icon: icons.ticket_discount,
      isRead: true,
    },
    {
      id: '5',
      discountMessage: 'Get %15 Off on international transfer fees',
      transferMessage: 'You can now send an international transfer using AlinmaPay App',
      date: '14/03/2024 - 15:30',
      icon: icons.ticket_discount,
      isRead: true,
    },
  ];
