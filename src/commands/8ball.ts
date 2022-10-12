import { MersenneTwister19937, pick } from 'random-js';
import { Category } from '../models/category';
import { BotCommand } from '../models/command';

const replies = [
  'Es cierto',
  'Estoy muy seguro que sí',
  'A huevo que sí',
  'La neta la neta sí',
  'La neta sí',
  'Yo tengo otros datos, y me dijeron que sí',
  'Es probable',
  'Hay chance',
  'cy',
  'Le pregunté al Goyo y me dijo que sí',
  '¿Qué mamada dijiste?, repiteme la pregunta',
  'A la vuelta, jóven',
  'Ijole, ni te digo',
  'No se puede predecir ahora',
  'A ver hijo. No te entendí, repite la pregunta',
  'Ni lo pienses',
  'La neta no',
  'Yo tengo otros datos',
  'Chales, la neta no',
  'Dudoso',
];

const randomEngine = MersenneTwister19937.autoSeed();

export const _8BallCommand: BotCommand = {
  category: Category.FUN,
  activationString: ['8ball', 'caracola', '🐚', '🎱'],
  description: '{pregunta} Llama a la Bola8 para responder tus preguntas',
  onMessage: async ({ message }) => {
    await message.reply(pick(randomEngine, replies));
  },
};
