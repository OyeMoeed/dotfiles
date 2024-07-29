import {
  PendingRequestProps,
  PreviousRequestProps,
} from '@app/components/molecules/ipay-request-card/ipay-request-card.interface';

const pendingRequests: PendingRequestProps[] = [
  {
    isPending: true,
    description: 'Mohamed Mahmoud has requested 1000 SAR from you',
    dateTime: '14/03/2024 15:30',
  },
  {
    isPending: true,
    description: 'Mohamed Mahmoud has requested 1000 SAR from you',
    dateTime: '14/03/2024 15:30',
  },

];

const previousRequests: PreviousRequestProps[] = [
  {
    isPending: false,
    status: 'paid',
    description: 'Mohamed Mahmoud has requested 1000 SAR from you',
    dateTime: '14/03/2024 15:30',
  },
  {
    isPending: false,
    status: 'cancelled',
    description: 'Alice Johnson has requested 500 SAR from you',
    dateTime: '01/01/2024 08:45',
  },
  {
    isPending: false,
    status: 'rejected',
    description: 'David Smith has requested 2000 SAR from you',
    dateTime: '05/03/2024 16:15',
  },
];

export { pendingRequests, previousRequests };
