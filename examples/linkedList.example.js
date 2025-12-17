import {LinkedList} from "../structures/linkedList.js";

const list = new LinkedList();

list.push(1);
list.push(2);
list.push(3);
console.log('Initial list:', list.toString()); // Initial list: 1, 2, 3

list.unshift(0);
console.log('After unshift(0):', list.toString()); // After unshift(0): 0, 1, 2, 3

console.log('length:', list.length); // length: 4
console.log('toArray:', list.toArray()); // toArray: [0, 1, 2, 3]

list.pop();
console.log('After pop():', list.toString()); // After pop(): 0, 1, 2
list.shift();
console.log('After shift():', list.toString()); // After shift(): 1, 2
console.log('length:', list.length); // length: 2

console.log('get(1):', list.get(1).value); // get(1): 2
list.set(1, 5);
console.log('get(1) after set:', list.get(1).value); // get(1) after set: 5

for (const node of list) {
    console.log('iter:', node);
}
