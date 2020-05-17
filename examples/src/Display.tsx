import React from 'react';

type DisplayProps = {
  tag?: string;
  count: number;
  decrement: () => void;
  increment: () => void;
};

function Display({
  tag = 'Display',
  count,
  decrement,
  increment,
}: DisplayProps) {
  // console.log(`${tag} rerender`);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

// export default Display;
export default React.memo(Display);
