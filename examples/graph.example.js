import {Graph, GraphMatrix} from '../structures/graph.js'

console.log("=== Example 1: Undirected graph ===");

const graph = new Graph();

graph
    .addVertex("A")
    .addVertex("B")
    .addVertex("C")
    .addVertex("D")
    .addVertex("E")
    .addEdge("A", "B", 4)
    .addEdge("A", "C", 2)
    .addEdge("B", "C", 1)
    .addEdge("B", "D", 5)
    .addEdge("C", "D", 8)
    .addEdge("C", "E", 10)
    .addEdge("D", "E", 2);

graph.print();

console.log("\n=== Example 2: Directed graph ===");

const directedGraph = new Graph();
directedGraph
    .addDirectedEdge("A", "B")
    .addDirectedEdge("A", "C")
    .addDirectedEdge("B", "D")
    .addDirectedEdge("C", "D")
    .addDirectedEdge("D", "E")
    .addDirectedEdge("E", "F");

directedGraph.print();

console.log("\n=== Example 3: Adjacency matrix ===");

const matrixGraph = new GraphMatrix(false);
matrixGraph
    .addVertex("A")
    .addVertex("B")
    .addVertex("C")
    .addVertex("D")
    .addEdge("A", "B", 1)
    .addEdge("A", "C", 1)
    .addEdge("B", "D", 1)
    .addEdge("C", "D", 1);

matrixGraph.printMatrix();