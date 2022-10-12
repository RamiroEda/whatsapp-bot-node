import { readFile } from 'fs/promises';
import { MessageMedia } from 'whatsapp-web.js';
import { Category } from '../models/category';
import { BotCommand } from '../models/command';

export const PlayCommand: BotCommand = {
  category: Category.AUDIO,
  activationString: ['play', 'p'],
  description: '{nombre} Reproduce una cancion de Spotify',
  onMessage: async ({ message }) => {
    const query: string | undefined = message.body.split(' ', 1)[1];

    if (query) {
      // const song = spotify.search()

      await message.reply('', undefined, {
        media: new MessageMedia(
          'audio/mp3',
          await readFile('./resources/nice_meme.mp3', { encoding: 'base64' }),
        ),
        sendAudioAsVoice: true,
      });
    } else {
      await message.reply('Ingresa el nombre a buscar');
    }
  },
};
