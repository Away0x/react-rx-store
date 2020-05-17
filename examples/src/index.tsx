import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Display from './Display';

// ------------------------------------------------------------------------------------
// import { counterStore, Store } from './store';

// function CounterDisplay() {
//   const { count } = Store.useStore();
//   const decrement = useCallback(() => { counterStore.decrement(); }, []);
//   const increment = useCallback(() => { counterStore.increment(); }, []);

//   return <Display count={count} decrement={decrement} increment={increment} />;
// }

// ------------------------------------------------------------------------------------
import { counter1Store, counter2Store, Store } from './multiStore';

function CounterDisplay() {
  const { counter1, counter2 } = Store.useStore();

  // const decrement1 = () => { counter1Store.decrement(); };
  // const increment1 = () => { counter1Store.increment(); };
  // const decrement2 = () => { counter2Store.decrement(); };
  // const increment2 = () => { counter2Store.increment(); };

  const decrement1 = useCallback(() => { counter1Store.decrement(); }, []);
  const increment1 = useCallback(() => { counter1Store.increment(); }, []);
  const decrement2 = useCallback(() => { counter2Store.decrement(); }, []);
  const increment2 = useCallback(() => { counter2Store.increment(); }, []);

  // 默认 subject 是在订阅时才初始化的，所以这里得保证使用 commit 前得先初始化了 subject
  useEffect(() => {
    increment1();
  }, [increment1]);

  return (
    <div>
      <Display tag="Display1" count={counter1.count} decrement={decrement1} increment={increment1} />
      <hr/>
      <Display tag="Display2" count={counter2.count} decrement={decrement2} increment={increment2} />
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