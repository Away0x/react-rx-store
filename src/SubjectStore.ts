import { Subject } from 'rxjs';
import { produce, Draft } from 'immer';

import { ISubjectStore } from './ISubjectStore';

export abstract class SubjectStore<T extends {}> implements ISubjectStore<T> {

  public LOG_TAG: string = 'SubjectStore';
  public abstract readonly defaultState: Readonly<T>;

  public subject: Subject<T> | null = null;
  public _state: T | null = null;

  public set state(newState: T) {
    this._state = newState;
  }

  public get state() {
    if (!this.subject || !this._state) return this.defaultState;
    return this._state;
  }

  public initialize() {
    if (this.subject) return;

    this.state = { ...this.defaultState };
    this.subject = new Subject();
    this.subject.next(this.state);
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
    this.state = { ...this.defaultState };
  }

  public commit(updateState: (draft: Draft<T>) => void) {
    const newState = produce(this.state, (draft) => {
      updateState(draft);
    });

    if (!this.subject) {
      console.warn(`[SubjectStore#commit] subject 还未初始化`);
      return;
    }
    this.subject.next(newState);
  }

  public reset() {
    this.subject && this.subject.next({ ...this.defaultState });
  }

}