import { EveryoneFunction } from '../functions/everyone';
import { Category } from '../models/category';
import { FunctionData } from '../models/function_data';
import { BotCommand } from './../models/command';

interface Poll {
  options: Option[];
  time: number;
  participants: string[];
}

interface Option {
  name: string;
  votes: string[];
}

let currentPoll: Poll | undefined;

export const PollCommand: BotCommand = {
  category: Category.UTILITY,
  activationString: ['poll', 'vote'],
  description:
    '{pregunta}? {opciones separadas por coma sin espacio} {segundos?} Inicia una encuesta',
  onMessage: async (data) => {
    if (currentPoll) {
      const messageSplit = data.message.body.toLowerCase().split(' ');
      const firstWord: string | undefined = messageSplit[0];

      if (firstWord === '!vote') {
        const second: string | undefined = messageSplit[1];

        const sNumber = Number.parseFloat(second ?? '');

        const index = second
          ? !Number.isNaN(sNumber)
            ? sNumber
            : undefined
          : undefined;

        if (index && index >= 1 && index <= currentPoll.options.length) {
          const option = currentPoll.options[index - 1];
          if (!currentPoll.participants.includes(data.contact.id.user)) {
            option.votes.push(data.contact.id.user);
            currentPoll.participants.push(data.contact.id.user);
            data.message.react('🗳️');
          } else {
            data.message.react('🧐');
          }
        } else {
          await data.message.reply('Formato incorrecto');
        }
      } else if (firstWord === '!poll') {
        await data.message.reply('Encuesta en curso');
      }
    } else {
      await createNewPoll(data);
    }
  },
};

async function createNewPoll(data: FunctionData): Promise<void> {
  await EveryoneFunction(data);
  const { message, chat } = data;

  const parsed = message.body
    .toLowerCase()
    .match(/poll .+\? [a-zA-Z0-9,]+ ?[0-9]*/);

  if (!parsed || parsed.length === 0) {
    await message.reply('Formato del comando incorrecto');
    return;
  }

  const args = parsed[0].split(' ');

  const secondString: string | undefined = args[args.length - 1];
  const sNumber = Number.parseFloat(secondString ?? '');

  const seconds = secondString
    ? !Number.isNaN(sNumber)
      ? sNumber
      : undefined
    : undefined;

  const optionString: string | undefined = args[
    args.length - (seconds ? 2 : 1)
  ].replace(/,$/, '');

  if (optionString?.includes(',') !== true) {
    await message.reply('Se necesita mas de una opción');
    return;
  }

  const options = optionString.split(',').map<Option>((name) => ({
    name,
    votes: [],
  }));

  currentPoll = {
    options,
    time: seconds ?? 60,
    participants: [],
  };

  await chat.sendMessage(
    `La encuesta terminará en ${currentPoll.time} segundos`,
  );

  await message.reply(
    `Escribe !vote {numero} para votar.\nOpciones:\n${currentPoll.options
      .map((opt, index) => `${index + 1}.- ${opt.name}`)
      .join('\n')}`,
  );

  setTimeout(() => {
    message.reply(`Resultados:
${options.map((opt) => `${opt.name} ${opt.votes.length}`).join('\n')}`);
  }, currentPoll.time * 1000);
}
