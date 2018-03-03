# callbag-switch-map 👜

A callbag operator that creates and switches to the new source whenever original source emits

`npm install callbag-switch-map`

## Usage:

Pullable Source

```js
const pipe = require('callbag-pipe');
const switchMap = require('callbag-switch-map');
const fromIter = require('callbag-from-iterable');
const forEach = require('callbag-for-each');


console.log('Pullable source');
pipe(
  fromIter('hi'),
  switchMap(char => fromIter([10, 20, 30]), (char,num) => char + num),
  forEach(x => console.log(x))
);

// Pullable source
// h10
// i10
// i20
// i30
```

Listenable Source

```js
const pipe = require('callbag-pipe');
const switchMap = require('callbag-switch-map');
const interval = require('callbag-interval');
const forEach = require('callbag-for-each');
const fromPromise = require('callbag-from-promise');

const fakeAjax = value => new Promise((resolve, reject) => {
	let period = value % 2 ? 400 : 1200; // Resolve odd numbers quickly
	setTimeout(resolve, period, (value*value));
});


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
