import { Source } from 'callbag';

declare function switchMap<T, U>(
    makeSource: { (x: T): Source<U> }
): { (source: Source<T>): Source<U> };
declare function switchMap<T, U, V>(
	makeSource: { (x: T): Source<U> },
	combineResults: { (x: T, y: U): V }
): { (source: Source<T>): Source<V> };

export default switchMap;