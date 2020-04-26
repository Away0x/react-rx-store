import {
  createContextStore,
  BehaviorSubjectStore,
  useSubjectStore,
} from '@away0x/react-rx-store';

interface CounterState {
  count: number;
}

class CounterStore extends BehaviorSubjectStore<CounterState> {

  public readonly defaultState: CounterState = {
    count: 0,
  }

  public decrement() {
    this.commit(state => state.count--);
  }

  public increment() {
    this.commit(state => state.count++);
  }

}

export const counterStore = new CounterStore();

export const Store = createContextStore(() => {
  return useSubjectStore(counterStore);
});
