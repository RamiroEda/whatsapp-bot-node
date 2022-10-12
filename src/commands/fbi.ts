import { readFile } from 'fs/promises';
import { MessageMedia } from 'whatsapp-web.js';
import { Category } from '../models/category';
import { BotCommand } from '../models/command';

export const FBICommand: BotCommand = {
  category: Category.AUDIO,
  activationString: ['fbi', '🚓'],
  description: 'FBI, open up',
  onMessage: async ({ message }) => {
    await message.reply('', undefined, {
      media: new MessageMedia(
        'audio/mp3',
        await readFile('./resources/fbi.mp3', { encoding: 'base64' }),
      ),
      sendAudioAsVoice: true,
    });
  },
};
