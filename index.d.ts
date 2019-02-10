import { Source } from 'callbag'

declare const switchMap: <I, O>(
    project: (data: I) => Source<O>
) => (source: Source<I>) => Source<O>;

export default switchMap;
