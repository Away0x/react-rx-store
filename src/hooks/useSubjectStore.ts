import { useState, useEffect } from 'react';

import { ISubjectStore } from '../ISubjectStore';

type UseSubjectStoreOptions = {
  dev?: boolean
};

export function useSubjectStore<T>(store: ISubjectStore<T>, options?: UseSubjectStoreOptions) {
  const [state, setState] = useState<T>(store.defaultState);

  useEffect(() => {
    store.subscribe((state: T) => {
      setState(state);
    });

    return () => {
      store.unsubscribe();
    }
  }, [store]);

  // 开发模式会将 store 挂载在 window 上，便于调试
  useEffect(() => {
    const storeName = store.constructor.name;

    if (options && options.dev) {
      //@ts-ignore
      window[storeName] = store;
    }
    return () => {
      if (options && options.dev) {
        //@ts-ignore
        window[storeName] = null;
      }
    }
  }, [store]);

  return state;
}
