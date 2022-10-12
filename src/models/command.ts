import { Category } from './category';
import { BotFunction } from './function';

export interface BotCommand {
  activationString: string[];
  description?: string;
  category: Category;
  onMessage: BotFunction;
}
