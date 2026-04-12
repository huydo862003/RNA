declare const x: number;
declare const y: number;
declare const a: number;
declare const b: number;
declare const c: number;
declare const d: number;
declare const value: number;
declare const max: number;
declare const index: number;
declare const array: number[];
declare const count: number;
declare const limit: number;

// Using > and >= (invalid)
const isBig = x > 5;
const isBigOrEqual = y >= 10;

if (max > value) {
  console.log('out of bounds');
}

while (array.length > index) {
  console.log(array[index]);
}

function foo() {
  return limit >= count ? limit : count;
}

const result = b > a ? c : d;
