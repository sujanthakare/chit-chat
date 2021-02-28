import { UserType } from './types';

const messages = [
  { id: 1, userType: UserType.SENDER, text: 'Hi' },
  { id: 2, userType: UserType.RECEIVER, text: 'Hi' },
  { id: 3, userType: UserType.SENDER, text: 'How are you?' },
  { id: 4, userType: UserType.RECEIVER, text: 'I am fine' },
  { id: 5, userType: UserType.RECEIVER, text: 'I am fine' },
  { id: 6, userType: UserType.RECEIVER, text: 'I am fine' },
];

export default messages;
