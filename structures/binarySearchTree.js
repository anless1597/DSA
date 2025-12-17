class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
    }
}

export class BinarySearchTree {
    constructor(iterable = []) {
        this._root = undefined;
        for (const v of iterable) {
            this.insert(v);
        }
    }

    insert(value) {
        const node = new TreeNode(value);
        if (!this._root) {
            this._root = node;
            return;
        }

        let current = this._root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = node;
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = node;
                    break;
                }
                current = current.right;
            }
        }
    }

    remove(value) {
        const removeNode = (node, value) => {
            if (!node) return;

            if (value < node.value) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return;
                } else if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }

                let tempNode = node.right;
                while (tempNode.left) {
                    tempNode = tempNode.left;
                }

                node.value = tempNode.value;
                node.right = removeNode(node.right, tempNode.value);
                return node;
            }
        };

        this._root = removeNode(this._root, value);
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
        const calculateHeight = (node) => {
            if (!node) return 0;

            const leftHeight = calculateHeight(node.left);
            const rightHeight = calculateHeight(node.right);

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return calculateHeight(this._root);
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
