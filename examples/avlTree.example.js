import {AVLTree} from "../structures/alvTree.js";

const avl = new AVLTree([10, 5, 15, 3, 7, 12]);

avl.insert(13);

console.log("Дерево:");
avl.printTree();

console.log("height:", avl.height); // height: 3
console.log("Contains 7?", avl.contains(7)); // Contains 7? true
console.log("Contains 20?", avl.contains(20)); // Contains 20? false

avl.remove(10);
console.log("After remove(10):");
avl.printTree();