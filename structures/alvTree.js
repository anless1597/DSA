class AVLNode {
    constructor(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

export class AVLTree {
    constructor(iterable = []) {
        this._root = undefined;
        for (const v of iterable) {
            this.insert(v);
        }
    }

    rightRotate(y) {
        const x = y.left;
        const z = x.right;

        x.right = y;
        y.left = z;

        y.height = Math.max(this.heightOfNode(y.left), this.heightOfNode(y.right)) + 1;
        x.height = Math.max(this.heightOfNode(x.left), this.heightOfNode(x.right)) + 1;

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const z = y.left;

        y.left = x;
        x.right = z;

        x.height = Math.max(this.heightOfNode(x.left), this.heightOfNode(x.right)) + 1;
        y.height = Math.max(this.heightOfNode(y.left), this.heightOfNode(y.right)) + 1;

        return y;
    }

    insert(value) {
        this._root = this._insert(this._root, value);
    }

    _insert(node, value) {
        if (!node) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            return node;
        }

        node.height = Math.max(this.heightOfNode(node.left), this.heightOfNode(node.right)) + 1;

        const balance = this.getBalance(node);

        if (balance > 1 && value < node.left.value) {
            return this.rightRotate(node);
        } else if (balance < -1 && value > node.right.value) {
            return this.leftRotate(node);
        } else if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        } else if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    remove(value) {
        this._root = this._remove(this._root, value);
    }

    _remove(node, value) {
        if (node === null) {
            return node;
        }

        if (value < node.value) {
            node.left = this._remove(node.left, value);
        } else if (value > node.value) {
            node.right = this._remove(node.right, value);
        } else {
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;

                if (temp === null) {
                    node = null;
                } else {
                    node = temp;
                }
            } else {
                let min = node.right;
                while (min.left !== null) {
                    min = min.left;
                }
                node.value = min.value;
                node.right = this._remove(node.right, min.value);
            }
        }

        if (node === null) {
            return node;
        }

        node.height = Math.max(this.heightOfNode(node.left), this.heightOfNode(node.right)) + 1;

        const balance = this.getBalance(node);

        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rightRotate(node);
        } else if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        } else if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.leftRotate(node);
        } else if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    find(value) {
        let current = this._root;
        while (current) {
            if (value === current.value) return current;
            else if (value < current.value) current = current.left;
            else current = current.right;
        }
        return undefined;
    }

    contains(value) {
        return !!this.find(value);
    }

    get height() {
        return this._root.height;
    }

    heightOfNode(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.heightOfNode(node.left) - this.heightOfNode(node.right) : 0;
    }

    printTree() {
        const lines = [];
        const buildLines = (node, prefix = "", isLeft = null) => {
            if (!node) return;

            if (node.right) {
                buildLines(node.right,
                    prefix + (isLeft === null ? "" : (isLeft ? "│   " : "    ")),
                    false);
            }

            const line = (isLeft === null)
                ? node.value.toString()
                : prefix + (isLeft ? "└── " : "┌── ") + node.value;
            lines.push(line);

            if (node.left) {
                buildLines(node.left,
                    prefix + (isLeft === null ? "" : (isLeft ? "    " : "│   ")),
                    true);
            }
        };

        if (!this._root) {
            console.log("(empty tree)");
            return;
        }

        buildLines(this._root);
        console.log(lines.join("\n"));
    }
}