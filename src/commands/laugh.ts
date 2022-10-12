import { readFile } from 'fs/promises';
import { MessageMedia } from 'whatsapp-web.js';
import { Category } from '../models/category';
import { BotCommand } from '../models/command';

export const LaughCommand: BotCommand = {
  category: Category.AUDIO,
  activationString: ['laugh', 'risa', 'XD', '🤣'],
  description: 'Risa sitcom',
  onMessage: async ({ message }) => {
    await message.reply('', undefined, {
      media: new MessageMedia(
        'audio/mp3',
        await readFile('./resources/sitcom_laugh.mp3', { encoding: 'base64' }),
      ),
      sendAudioAsVoice: true,
    });
  },
};
