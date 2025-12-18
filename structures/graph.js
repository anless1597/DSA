export class Graph {
    constructor() {
        this.adjacencyList = new Map();
        this._vertices = new Set();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Set());
            this._vertices.add(vertex);
        }
        return this;
    }

    addEdge(vertex1, vertex2, weight = 1) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);

        this.adjacencyList.get(vertex1).add({ node: vertex2, weight });
        this.adjacencyList.get(vertex2).add({ node: vertex1, weight });

        return this;
    }

    addDirectedEdge(from, to, weight = 1) {
        this.addVertex(from);
        this.addVertex(to);

        this.adjacencyList.get(from).add({ node: to, weight });
        return this;
    }

    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList.has(vertex1)) {
            const neighbors = this.adjacencyList.get(vertex1);
            for (const neighbor of neighbors) {
                if (neighbor.node === vertex2) {
                    neighbors.delete(neighbor);
                    break;
                }
            }
        }

        if (this.adjacencyList.has(vertex2)) {
            const neighbors = this.adjacencyList.get(vertex2);
            for (const neighbor of neighbors) {
                if (neighbor.node === vertex1) {
                    neighbors.delete(neighbor);
                    break;
                }
            }
        }

        return this;
    }

    removeVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) return this;

        const neighbors = this.adjacencyList.get(vertex);
        for (const neighbor of neighbors) {
            this.removeEdge(vertex, neighbor.node);
        }

        this.adjacencyList.delete(vertex);
        this._vertices.delete(vertex);

        return this;
    }

    getNeighbors(vertex) {
        return this.adjacencyList.has(vertex)
            ? Array.from(this.adjacencyList.get(vertex)).map(n => n.node)
            : [];
    }

    getNeighborsWithWeights(vertex) {
        return this.adjacencyList.has(vertex)
            ? Array.from(this.adjacencyList.get(vertex))
            : [];
    }

    hasEdge(vertex1, vertex2) {
        if (!this.adjacencyList.has(vertex1)) return false;

        const neighbors = this.adjacencyList.get(vertex1);
        for (const neighbor of neighbors) {
            if (neighbor.node === vertex2) return true;
        }
        return false;
    }

    getEdgeWeight(vertex1, vertex2) {
        if (!this.adjacencyList.has(vertex1)) return null;

        const neighbors = this.adjacencyList.get(vertex1);
        for (const neighbor of neighbors) {
            if (neighbor.node === vertex2) return neighbor.weight;
        }
        return null;
    }

    print() {
        for (const [vertex, neighbors] of this.adjacencyList) {
            const neighborList = Array.from(neighbors)
                .map(n => `${n.node}(${n.weight})`)
                .join(", ");
            console.log(`${vertex} -> ${neighborList}`);
        }
    }

    get vertices() {
        return Array.from(this._vertices);
    }

    get edges() {
        const edges = [];
        const visitedEdges = new Set();

        for (const [vertex, neighbors] of this.adjacencyList) {
            for (const neighbor of neighbors) {
                const edgeKey = vertex < neighbor.node
                    ? `${vertex}-${neighbor.node}`
                    : `${neighbor.node}-${vertex}`;

                if (!visitedEdges.has(edgeKey)) {
                    edges.push({
                        from: vertex,
                        to: neighbor.node,
                        weight: neighbor.weight
                    });
                    visitedEdges.add(edgeKey);
                }
            }
        }

        return edges;
    }
}

export class GraphMatrix {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.vertexIndex = new Map(); // vertex -> index
        this.adjacencyMatrix = [];
    }

    addVertex(vertex) {
        if (this.vertexIndex.has(vertex)) return this;

        const index = this.vertices.length;
        this.vertices.push(vertex);
        this.vertexIndex.set(vertex, index);

        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            this.adjacencyMatrix[i].push(0);
        }
        this.adjacencyMatrix.push(new Array(this.vertices.length).fill(0));

        return this;
    }

    addEdge(vertex1, vertex2, weight = 1) {
        if (!this.vertexIndex.has(vertex1) || !this.vertexIndex.has(vertex2)) {
            throw new Error("Вершины не существуют");
        }

        const i = this.vertexIndex.get(vertex1);
        const j = this.vertexIndex.get(vertex2);

        this.adjacencyMatrix[i][j] = weight;
        if (!this.isDirected) {
            this.adjacencyMatrix[j][i] = weight;
        }

        return this;
    }

    hasEdge(vertex1, vertex2) {
        if (!this.vertexIndex.has(vertex1) || !this.vertexIndex.has(vertex2)) {
            return false;
        }

        const i = this.vertexIndex.get(vertex1);
        const j = this.vertexIndex.get(vertex2);

        return this.adjacencyMatrix[i][j] !== 0;
    }

    getNeighbors(vertex) {
        if (!this.vertexIndex.has(vertex)) return [];

        const i = this.vertexIndex.get(vertex);
        const neighbors = [];

        for (let j = 0; j < this.vertices.length; j++) {
            if (this.adjacencyMatrix[i][j] !== 0) {
                neighbors.push({
                    node: this.vertices[j],
                    weight: this.adjacencyMatrix[i][j]
                });
            }
        }

        return neighbors;
    }

    printMatrix() {
        console.log("\t", this.vertices.join("\t"));

        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            const row = this.adjacencyMatrix[i]
                .map(val => val.toString().padStart(2))
                .join("\t");
            console.log(`${this.vertices[i]}\t[${row}]`);
        }
    }
}