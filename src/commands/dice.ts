import { BotCommand } from './../models/command';
import { dice, MersenneTwister19937 } from 'random-js';
import { Category } from '../models/category';

const engine = MersenneTwister19937.autoSeed();

export const DiceCommand: BotCommand = {
  category: Category.UTILITY,
  activationString: ['d'],
  description: '{lados} Lanza un dado',
  onMessage: ({ message }) => {
    const size: string | undefined = message.body.split(' ')[1];

    const sNumber = Number.parseFloat(size ?? '');

    const faces =
      (size ? (!Number.isNaN(sNumber) ? sNumber : undefined) : undefined) ?? 6;

    message.reply(`D${faces}: ${dice(faces, 1)(engine)[0]}`);
  },
};
