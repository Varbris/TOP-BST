class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class Tree {
  constructor(myArr) {
    this.root = this.buildTree(myArr);
  }

  buildTree(arr) {
    var myArr = this.mergeSort(arr);
    console.log(myArr);
  }

  merge(leftArr, rightArr) {
    var result = [];
    var l = 0;
    var r = 0;

    while (l < leftArr.length && r < rightArr.length) {
      if (leftArr[l] < rightArr[r]) {
        result.push(leftArr[l]);
        l++;
      } else {
        result.push(rightArr[r]);
        r++;
      }
    }

    for (; l < leftArr.length; l++) {
      result.push(leftArr[l]);
    }
    for (; r < rightArr.length; r++) {
      result.push(rightArr[r]);
    }

    return result;
  }

  mergeSort(arr) {
    const length = arr.length;

    if (length <= 1) {
      return arr;
    }
    var middle = Math.floor(length / 2);
    var arrLeft = arr.slice(0, middle);
    var arrRight = arr.slice(middle);

    return this.merge(this.mergeSort(arrLeft), this.mergeSort(arrRight));
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree(arr);
