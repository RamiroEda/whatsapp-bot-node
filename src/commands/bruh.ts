import { readFile } from 'fs/promises';
import { MessageMedia } from 'whatsapp-web.js';
import { Category } from '../models/category';
import { BotCommand } from '../models/command';

export const BruhCommand: BotCommand = {
  category: Category.AUDIO,
  activationString: ['bruh'],
  description: 'Bruh',
  onMessage: async ({ message }) => {
    await message.reply('', undefined, {
      media: new MessageMedia(
        'audio/mp3',
        await readFile('./resources/bruh.mp3', { encoding: 'base64' }),
      ),
      sendAudioAsVoice: true,
    });
  },
};
