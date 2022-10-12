import { readFile } from 'fs/promises';
import { MessageMedia } from 'whatsapp-web.js';
import { BotFunction } from '../models/function';

export const Sex0Function: BotFunction = async ({ message }) => {
  if (message.body.toLowerCase().includes('sex0')) {
    const file = await readFile('./resources/sex0.jpeg', {
      encoding: 'base64',
    });

    await message.reply('Sex0', undefined, {
      media: new MessageMedia('image/jpeg', file),
      sendMediaAsSticker: true,
      stickerAuthor: 'ProcloBot',
      stickerName: 'Sex0',
    });
  }
};
