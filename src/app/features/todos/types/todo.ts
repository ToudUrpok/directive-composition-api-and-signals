import { Identifiable } from '@app/types';

export type Todo = Identifiable & {
  title: string
  completed: boolean
}
