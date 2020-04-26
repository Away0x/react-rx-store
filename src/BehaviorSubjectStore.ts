import { BehaviorSubject } from 'rxjs';
import { produce, Draft } from 'immer';

import { ISubjectStore } from './ISubjectStore';

export abstract class BehaviorSubjectStore<T = {}> implements ISubjectStore<T> {

  public LOG_TAG: string = 'BehaviorSubjectStore';
  public abstract readonly defaultState: Readonly<T>;

  public subject: BehaviorSubject<T> | null = null;

  public set state(newState: T) {
    this.subject && this.subject.next(newState);
  }

  public get state() {
    if (!this.subject) return this.defaultState;
    return this.subject.getValue();
  }

  public initialize() {
    if (this.subject) return;
    this.subject = new BehaviorSubject(this.defaultState);
  };

  public stateUpdate(state: Readonly<T>) { }

  public subscribe(stateUpdate: (state: Readonly<T>) => void) {
    this.initialize();

    this.subject && this.subject.subscribe((s) => {
      this.stateUpdate(s);
      stateUpdate(s);
    });
  }

  public unsubscribe() {
    this.subject && this.subject.unsubscribe();
    this.subject = null;
  }

  /** 不使用 immer
  public commit(newState: Partial<T>) {
    this.subject && this.subject.next({ ...this.state, ...newState });
  }
  */

  public commit(updateState: (draft: Draft<T>) => void) {
    // console.group(`${this.LOG_TAG} commit`);
    // console.log(`prev state: `, this.state);
    const newState = produce(this.state, (draft) => {
      updateState(draft);
    });

    this.subject && this.subject.next(newState);
    // console.log(`next state: `, newState);
    // console.groupEnd();
  }

  public reset() {
    this.subject && this.subject.next({ ...this.defaultState });
  }

}
