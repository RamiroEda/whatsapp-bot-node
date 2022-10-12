import { readFile } from 'fs/promises';
import { MessageMedia } from 'whatsapp-web.js';
import { Category } from '../models/category';
import { BotCommand } from '../models/command';

export const JohnCenaCommand: BotCommand = {
  category: Category.AUDIO,
  activationString: ['john_cena', 'jc'],
  description: 'And his name is John Cena',
  onMessage: async ({ message }) => {
    await message.reply('', undefined, {
      media: new MessageMedia(
        'audio/mp3',
        await readFile('./resources/john_cena.mp3', { encoding: 'base64' }),
      ),
      sendAudioAsVoice: true,
    });
  },
};
