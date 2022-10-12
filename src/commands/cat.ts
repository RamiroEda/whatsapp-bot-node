import { MessageMedia } from 'whatsapp-web.js';
import fetch from 'node-fetch';
import { BotCommand } from './../models/command';
import { Category } from '../models/category';

export const CatCommand: BotCommand = {
  category: Category.FUN,
  activationString: ['cat', '🐈', '🐈‍⬛', '😺'],
  description: 'Envia una imagen aleatoria de un gato',
  onMessage: async ({ message }) => {
    const catImage = await fetch('https://cataas.com/cat/cute')
      .then((res) => res.buffer())
      .then((buff) => buff.toString('base64'));

    await message.reply('', undefined, {
      media: new MessageMedia('image/jpeg', catImage),
    });
  },
};
