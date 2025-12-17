export class Stack {
    constructor(iterable = []) {
        this._data = [];
        for (const item of iterable) this.push(item);
    }

    push(value) {
        this._data.push(value);
        return this;
    }

    pop() {
        return this._data.length ? this._data.pop() : undefined;
    }

    peek() {
        return this._data.length ? this._data[this._data.length - 1] : undefined;
    }

    get length() {
        return this._data.length;
    }

    isEmpty() {
        return this._data.length === 0;
    }

    toString() {
        return this._data.toString();
    }

    toArray() {
        return this._data.slice();
    }

    *[Symbol.iterator]() {
        for (let i = this._data.length - 1; i >= 0; i--) {
            yield this._data[i];
        }
    }
}
