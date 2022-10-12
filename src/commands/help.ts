import { Category } from '../models/category';
import { BotCommand } from './../models/command';

export const HelpCommand: BotCommand = {
  category: Category.UTILITY,
  activationString: ['help'],
  description: 'Ver lista de comandos',
  onMessage({ message, bot }) {
    message.reply(`Comandos:
======================
${Object.values(Category)
  .map(
    (cat) =>
      `*${cat}*\n${bot.commands
        .filter((it) => it.category === cat)
        .map(
          (com) =>
            `*!${
              com.activationString.length > 1
                ? `[${com.activationString.join(', ')}]`
                : `${com.activationString[0]}`
            }* ${com.description}`,
        )
        .join('\n')}`,
  )
  .join('\n\n')}`);
  },
};
