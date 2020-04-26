import React from 'react';

type ContextStore<T> = {
  Provider: React.ComponentType;
  useStore: () => T;
};

export function createContextStore<T>(
  useContextValue: () => T,
): ContextStore<T> {
  const Context = React.createContext<T | null>(null);

  const Provider: React.FC = ({ children }) => {
    const value = useContextValue();

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  };

  function useStore(): T {
    const value = React.useContext(Context);

    if (value === null) {
      throw new Error("Component must be wrapped with <ContextStore.Provider>");
    }

    return value;
  }

  return {
    Provider,
    useStore,
  };
}