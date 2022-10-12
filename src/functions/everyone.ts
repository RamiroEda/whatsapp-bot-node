import { prisma } from './../prisma';
import { BotFunction } from '../models/function';

export const EveryoneFunction: BotFunction = async ({ message, bot }) => {
  if (message.body.toLowerCase().includes('@everyone')) {
    const participants = await prisma.user.findMany({
      where: {
        chatId: bot.groupId,
      },
    });

    await message.reply(
      participants.map((part) => `@${part.number}`).join(' '),
      undefined,
      {
        mentions: participants as any,
      },
    );
  }
};
