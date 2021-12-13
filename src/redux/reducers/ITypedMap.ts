import {Map} from 'immutable';
export default interface ITypedMap<T> extends Map<string, any> {
  toJS(): T;
  get<I extends keyof T>(key: I & string): T[I];
}
