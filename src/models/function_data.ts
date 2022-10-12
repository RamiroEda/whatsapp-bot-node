import { GroupChat, Contact, Message } from 'whatsapp-web.js';
import { IGroupChat } from './group';

export interface FunctionData {
  bot: IGroupChat;
  message: Message;
  chat: GroupChat;
  contact: Contact;
}
