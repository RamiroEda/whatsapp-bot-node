import { MersenneTwister19937, pick } from 'random-js';
import { BotFunction } from '../models/function';

const randomEngine = MersenneTwister19937.autoSeed();

const synsOfDick = [
  'pito',
  'verga',
  'dick',
  'pene',
  'aparato reproductor masculino',
  'chorizo',
  'longaniza',
  'pija',
  'trusco',
  'riata',
  'reata',
  'pajaro',
  'miembro',
  'pezcuesona',
  'pilin',
  'tilin',
  'polla',
  'chile',
  'picha',
  'pinga',
  'poronga',
  'pichula',
  'banano',
  'banana',
  'platano',
  'garrote',
  'cañon',
  'falo',
  'corneta',
  'tula',
  'nutria',
  'palo',
  'tronco',
  'poronga',
  'cock',
  'culebra',
  'vibora',
  'salchicha',
  'nepe',
  'enep',
  'mangera',
  'pelao',
  'sable',
  'rifle',
  'fusil',
  'mocoso',
  'pepino',
  'puntita',
  'sin hueso',
  'pitufo',
  'genital',
  'ciclope',
];

const albures = [
  'Chupas',
  'Comes',
  'Regurgitas',
  'Masticas',
  'Lames',
  'Te atragantas',
  'Degustas',
  'Lustras',
];

export const VergaFunction: BotFunction = async ({ message }) => {
  if (
    synsOfDick
      .map((dickMsg) => message.body.toLocaleLowerCase().includes(dickMsg))
      .includes(true)
  ) {
    await message.reply(pick(randomEngine, albures));
    await message.react('🍆');
  }
};
