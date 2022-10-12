import { BotFunction } from './../models/function';
export const OlaFunction: BotFunction = ({ message }) => {
  if (message.body.toLowerCase() === 'ola') {
    message.reply('🌊');
    message.react('🌊');
  }
};
