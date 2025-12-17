import {DoublyLinkedList} from "../structures/doublyLinkedList.js";

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.push(1);
doublyLinkedList.push(2);
doublyLinkedList.push(3);
console.log('Initial list:', doublyLinkedList.toString()); // Initial list: 1, 2, 3

doublyLinkedList.unshift(0);
console.log('After unshift(0):', doublyLinkedList.toString()); // After unshift(0): 0, 1, 2, 3

console.log('length:', doublyLinkedList.length); // length: 4
console.log('toArray:', doublyLinkedList.toArray()); // toArray: [0, 1, 2, 3]

doublyLinkedList.pop();
console.log('After pop():', doublyLinkedList.toString()); // After pop(): 0, 1, 2
doublyLinkedList.shift();
console.log('After shift():', doublyLinkedList.toString()); // After shift(): 1, 2
console.log('length:', doublyLinkedList.length); // length: 2

console.log('get(1):', doublyLinkedList.get(1).value); // get(1): 2
doublyLinkedList.set(1, 5);
console.log('get(1) after set:', doublyLinkedList.get(1).value); // get(1) after set: 5

for (const node of doublyLinkedList) {
    console.log('iter:', node);
}
