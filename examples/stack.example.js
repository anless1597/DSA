import { Stack } from '../structures/stack.js';

const stack = new Stack([1, 2, 3]);
console.log('Initial stack:', stack.toString()); // Initial stack: 1, 2, 3
stack.push(4);
console.log('After push(4):', stack.toString());

console.log('peek:', stack.peek());    // peek: 4
stack.pop();
console.log('After pop():', stack.toString()); // After pop(): 1, 2, 3
console.log('length:', stack.length);  // length: 3
console.log('toArray:', stack.toArray()); // toArray: [1, 2, 3]

console.log('iterate (LIFO):');
for (const value of stack) {
    console.log(value);
}
