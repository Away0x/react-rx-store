import {
  createContextStore,
  BehaviorSubjectStore,
  useSubjectStore,
} from '@away0x/react-rx-store';

interface CounterState {
  count: number;
}

class Counter1Store extends BehaviorSubjectStore<CounterState> {
  public readonly defaultState: CounterState = { count: 0 }
  public decrement() { this.commit(state => state.count--); }
  public increment() { this.commit(state => state.count++); }
}

class Counter2Store extends BehaviorSubjectStore<CounterState> {
  public readonly defaultState: CounterState = { count: 0 }
  public decrement() { this.commit(state => state.count--); }
  public increment() { this.commit(state => state.count++); }
}

export const counter1Store = new Counter1Store();
export const counter2Store = new Counter2Store();

export const Store = createContextStore(() => {
  const counter1 = useSubjectStore(counter1Store);
  const counter2 = useSubjectStore(counter2Store);

  return {
    counter1,
    counter2,
  };
});
