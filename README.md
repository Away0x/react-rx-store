# React Rx Store
> react state management with rxjs

## Install
```bash
npm install --save @away0x/react-rx-store
```

## Types
```typescript
interface ISubjectStore<T extends {}> {
  subscribe: (setState: (state: T) => void) => void;
  unsubscribe: () => void;
  commit: (updateState: (draft: Draft<T>) => void) => void;
  reset: () => void;
  defaultState: T;
  state: T;
}
```

## Examples
```typescript
// store
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
```
```typescript
// view
import { counterStore, Store } from './store';

function CounterDisplay() {
  const { count } = Store.useStore();
  
  const decrement = () => {
    counterStore.decrement();
  };

  const increment = () => {
    counterStore.increment();
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

function App() {
  return (
    <Store.Provider>
      <CounterDisplay />
    </Store.Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

***
