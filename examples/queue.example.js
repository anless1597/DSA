import {Queue} from "../structures/queue.js";

const queue = new Queue([1, 2, 3]);
console.log('Initial queue:', queue.toString()); // Initial queue: 1, 2, 3
queue.enqueue(4);
console.log('After enqueue(4):', queue.toString());

console.log('peek:', queue.peek());    // peek: 4
queue.dequeue();
console.log('After dequeue():', queue.toString()); // After dequeue(): 1, 2, 3
console.log('length:', queue.length);  // length: 3
console.log('toArray:', queue.toArray()); // toArray: [1, 2, 3]

console.log('iterate (FIFO):');
for (const value of queue) {
    console.log(value);
}
