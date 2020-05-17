import {
  createContextStore,
  BehaviorSubjectStore,
  useSubjectStore,
} from '@away0x/react-rx-store';

import { BehaviorSubject } from 'rxjs';
import { create as spyCreate } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators';

const spy = spyCreate();

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

  // 中转数据到 spy subject，便于 log
  private spySubject: BehaviorSubject<CounterState> | null = null;
  public stateUpdate(state: Readonly<CounterState>) {
    this.spySubject && this.spySubject.next(state);
  }

  public subscribeSpySubject() {
    if (!this.spySubject) {
      this.spySubject = new BehaviorSubject(counter1Store.defaultState);
    }

    this.spySubject.pipe(
      tag('Counter2Store'),
    ).subscribe();
  }

  public unsubscribe() {
    super.unsubscribe();
    this.spySubject && this.spySubject.unsubscribe();
  }

}

export const counter1Store = new Counter1Store();
// 默认是订阅时才初始化 subject 的，如果需要订阅时 useEffect 中直接使用 commit，则需要保证 commit 前先初始化了 subject
counter1Store.initialize();

export const counter2Store = new Counter2Store();

export const Store = createContextStore(() => {
  const counter1 = useSubjectStore(counter1Store);
  const counter2 = useSubjectStore(counter2Store);

  return {
    counter1,
    counter2,
  };
});

// normal logging
// counter1Store.subscribe((state) => {
//   console.log('counter1Store current state', state)
// });

// counter2Store.subscribe((state) => {
//   console.log('counter2Store current state', state)
// });

// spy logging
counter2Store.subscribeSpySubject();
spy.log();