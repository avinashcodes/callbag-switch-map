# callbag-switch-map 👜

A callbag operator that creates and switches to the new source whenever original source emits

`npm install callbag-switch-map`

## Usage:

```js
import pipe from 'callbag-pipe';
import interval from 'callbag-interval';
import take from 'callbag-take';
import fromPromise from 'callbag-from-promise';
import switchMap from 'callbag-switch-map';
import fromIter from 'callbag-from-iterable';
import forEach from 'callbag-for-each';

const fakeAjax = value => new Promise(resolve, reject){
	let period = value % 2 ? 400 : 1200; // Resolve odd numbers quickly
	setTimeout(resolve, 1000, (value*value));
});

console.log('Pullable source');
pipe(
  fromIter('hi'),
  switchMap(char => pipe(
    fromIter([10, 20, 30]),
    map(num => char + num)
  )),
  forEach(x => console.log(x))
);

// Pullable source
// h10
// i10
// i20
// i30



console.log('Listenable source');
pipe(
  interval(500),
  switchMap(i => fromPromise(fakeAjax(i))),
  forEach(x => console.log(x))
);

// Listenable source
// 1
// 9
// 25
// 49
// 81
// 121
// ....


```
