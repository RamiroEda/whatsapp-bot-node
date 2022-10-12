import { FunctionData } from './function_data';

export type BotFunction = (data: FunctionData) => void | Promise<void>;
