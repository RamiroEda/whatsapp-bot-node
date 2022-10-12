import { WBRBCommand } from './commands/wbrb';
import { LaughCommand } from './commands/laugh';
import { ScreamCommand } from './commands/scream';
import { JohnCenaCommand } from './commands/john_cena';
import { ImFineCommand } from './commands/im_fine';
import { GoatScreamCommand } from './commands/goat_scream';
import { FBICommand } from './commands/fbi';
import { CurbCommand } from './commands/curb';
import { CricketsCommand } from './commands/crickets';
import { BruhCommand } from './commands/bruh';
import { StickerCommand } from './commands/sticker';
import { PollCommand } from './commands/poll';
import { VergaFunction } from './functions/verga';
import { HelpCommand } from './commands/help';
import { JotosFunction } from './functions/jotos';
import { BotCommand } from './models/command';
import { BotFunction } from './models/function';
import { IGroupChat } from './models/group';
import { EveryoneFunction } from './functions/everyone';
import { OlaFunction } from './functions/ola';
import { Sex0Function } from './functions/sex0';
import { DiceCommand } from './commands/dice';
import { _8BallCommand } from './commands/8ball';
import { CatCommand } from './commands/cat';
import { YeiCommand } from './commands/yei';
import { SiniestroCommand } from './commands/siniestro';
import { NiceMemeCommand } from './commands/nice_meme';

export class PersonalBot extends IGroupChat {
  commands: BotCommand[] = [
    HelpCommand,
    PollCommand,
    DiceCommand,
    StickerCommand,
    _8BallCommand,
    CatCommand,
    BruhCommand,
    CricketsCommand,
    CurbCommand,
    FBICommand,
    GoatScreamCommand,
    ImFineCommand,
    JohnCenaCommand,
    ScreamCommand,
    LaughCommand,
    WBRBCommand,
    YeiCommand,
    SiniestroCommand,
    NiceMemeCommand,
  ];
  functions: BotFunction[] = [
    JotosFunction,
    VergaFunction,
    EveryoneFunction,
    OlaFunction,
    Sex0Function,
  ];
}
