export class Queue {
    constructor(iterable = []) {
        this._data = [];
        this._head = 0;
        this._length = 0;
        for (const item of iterable) this.enqueue(item);
    }

    enqueue(value) {
        this._data.push(value);
        this._length++;
    }

    dequeue() {
        if (this._length === 0) return undefined;
        const value = this._data[this._head];
        this._head++;
        this._length--;

        if (this._head > 10) {
            this._data = this._data.slice(this._head);
            this._head = 0;
        }

        return value;
    }

    peek() {
        return this._length === 0 ? undefined : this._data[this._head];
    }

    get length() {
        return this._length;
    }

    isEmpty() {
        return this._length === 0;
    }

    toString() {
        return this._data.slice(this._head).toString();
    }

    toArray() {
        return this._data.slice(this._head);
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this._length; i++) {
            yield this._data[this._head + i];
        }
    }
}
