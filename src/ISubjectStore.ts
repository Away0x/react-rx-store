import { Draft } from 'immer';

export interface ISubjectStore<T extends {}> {
  subscribe: (setState: (state: T) => void) => void;
  unsubscribe: () => void;
  commit: (updateState: (draft: Draft<T>) => void) => void;
  reset: () => void;
  defaultState: T;
  state: T;
}