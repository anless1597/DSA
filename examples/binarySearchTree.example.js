import {BinarySearchTree} from "../structures/binarySearchTree.js";

const bst = new BinarySearchTree([10, 5, 15, 3, 7, 12]);

bst.insert(18);

console.log("Дерево:");
bst.printTree();

console.log("height:", bst.height); // height: 3
console.log("Contains 7?", bst.contains(7)); // Contains 7? true
console.log("Contains 20?", bst.contains(20)); // Contains 20? false

bst.remove(5);
console.log("After remove(5):");
bst.printTree();