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

// Using < and <= (valid)
const isSmall = x < 5;
const isSmallOrEqual = y <= 10;

if (value < max) {
  console.log('within bounds');
}

while (index < array.length) {
  console.log(array[index]);
}

const result1 = count <= limit ? count : limit;
const result2 = a < b ? c : d;
