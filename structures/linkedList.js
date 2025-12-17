class Node {
    constructor(value) {
        this.value = value;
        this.next = undefined;
    }
}

export class LinkedList {
    constructor() {
        this._head = undefined;
        this._tail = undefined;
        this._length = 0;
    }

    push(value) {
        const node = new Node(value);
        if (!this._head) {
            this._head = this._tail = node;
        } else {
            this._tail.next = node;
            this._tail = node;
        }
        this._length++;
    }

    unshift(value) {
        const node = new Node(value);
        if (!this._head) {
            this._head = this._tail = node;
        } else {
            node.next = this._head;
            this._head = node;
        }
        this._length++;
    }

    pop() {
        if(this.isEmpty()) return;

        const result = this._tail.value;

        if (this._length === 1) {
            this._head = undefined;
            this._tail = undefined;
            this._length = 0;
            return result;
        }

        let current = this._head;
        while (current.next !== this._tail) current = current.next;
        this._tail = current;
        this._tail.next = undefined;
        this._length--;
        return result;
    }

    shift() {
        if(this.isEmpty()) return;

        const result = this._head.value;

        if (this._length === 1) {
            this._head = undefined;
            this._tail = undefined;
            this._length = 0;
            return result;
        }

        this._head = this._head.next;
        this._length--;
        return result;
    }

    get length() {
        return this._length;
    }

    isEmpty() {
        return this._length === 0;
    }

    get(index) {
        if (index < 0 || index >= this._length) return undefined;
        let current = this._head;
        let i = 0;
        while (i < index) {
            current = current.next;
            i++;
        }
        return current;
    }

    set(index, value) {
        const node = this.get(index);
        if (!node) return false;
        node.value = value;
        return true;
    }

    toString() {
        const result = [];

        for(let current = this._head; current; current = current.next) {
            result.push(current.value);
        }

        return result.join(', ');
    }

    toArray() {
        const arr = [];
        let current = this._head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    *[Symbol.iterator] () {
        let current = this._head;

        while(current) {
            yield current.value;
            current = current.next;
        }
    }
}