function bubbleSort(arr) {
    const _arr = [...arr];
    for (let end = 1; end < _arr.length; end++) {
        for (let i = 0; i < arr.length - end; i++) {
            if (_arr[i] > _arr[i+1]) {
                const temp = _arr[i];
                _arr[i] = _arr[i+1];
                _arr[i+1] = temp;
            }
        }
    }
    return _arr;
}

function insertionSort(arr) {
    const _arr = [...arr];
    for (let i = 1; i < _arr.length; i++) {
        const current = _arr[i];
        let j = i - 1;
        while (j >= 0 && _arr[j] > current) {
            _arr[j + 1] = _arr[j];
            j--;
        }
        _arr[j + 1] = current;
    }
    return _arr;
}

function selectionSort(arr) {
    const _arr = [...arr];
    for (let i = 0; i < _arr.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < _arr.length; j++) {
            if (_arr[j] < _arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            const temp = _arr[i];
            _arr[i] = _arr[min];
            _arr[min] = temp;
        }
    }
    return _arr;
}

const arr = [15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19];
const sortedArr = selectionSort(arr);
console.log(sortedArr);