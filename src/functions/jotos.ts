import { BotFunction } from '../models/function';

const jotos = [
  'ureño',
  'juancho',
  'vic',
  'juampix',
  'goyo',
  'polo',
  'zamu',
  'alexis',
];

export const JotosFunction: BotFunction = async ({ message }) => {
  const words = message.body.toLowerCase().split(' ');
  const lastWord = words[words.length - 1];
  if (jotos.includes(lastWord)) {
    await message.reply('Joto');
  }
};
