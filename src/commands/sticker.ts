import { Category } from '../models/category';
import { BotCommand } from '../models/command';

export const StickerCommand: BotCommand = {
  category: Category.UTILITY,
  activationString: ['sticker'],
  description: 'Crea un sticker a partir de contenido',
  onMessage: async ({ message }) => {
    if (!message.hasMedia) return;

    await message.reply('', undefined, {
      media: await message.downloadMedia(),
      sendMediaAsSticker: true,
      stickerAuthor: 'ProcloBot',
      stickerName: `${Date.now()}`,
    });
  },
};
