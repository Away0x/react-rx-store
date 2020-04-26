import React from 'react';
import ReactDOM from 'react-dom';

// import { counterStore, Store } from './store';
import { counter1Store, counter2Store, Store } from './multiStore';

// function CounterDisplay() {
//   const { count } = Store.useStore();
  
//   const decrement = () => {
//     counterStore.decrement();
//   };

//   const increment = () => {
//     counterStore.increment();
//   };

//   return (
//     <div>
//       <button onClick={decrement}>-</button>
//       <span>{count}</span>
//       <button onClick={increment}>+</button>
//     </div>
//   );
// }

function CounterDisplay() {
  const { counter1, counter2 } = Store.useStore();

  const decrement1 = () => { counter1Store.decrement(); };
  const increment1 = () => { counter1Store.increment(); };

  const decrement2 = () => { counter2Store.decrement(); };
  const increment2 = () => { counter2Store.increment(); };

  return (
    <div>
      <button onClick={decrement1}>-</button>
      <span>{counter1.count}</span>
      <button onClick={increment1}>+</button>
      <hr/>
      <button onClick={decrement2}>-</button>
      <span>{counter2.count}</span>
      <button onClick={increment2}>+</button>
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