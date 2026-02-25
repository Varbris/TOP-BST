class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(myArr) {
    const arr = this.removeDuplicate(this.mergeSort(myArr));
    this.root = this.buildTree(arr, 0, myArr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    if (mid > arr.length) {
      return null;
    } else {
      return root;
    }
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

  removeDuplicate(arr) {
    const result = new Array();
    arr.forEach((element) => {
      if (!result.includes(element, 0)) {
        result.push(element);
      }
    });
    console.log(result);
    return result;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  preOrderDfs(node, value, callBack) {
    if (node === null || node === undefined) {
      return;
    }
    if (callBack(node, value)) {
      return true;
    }
    var left = this.preOrderDfs(node.left, value, callBack);
    var right = this.preOrderDfs(node.right, value, callBack);

    if (left || right) {
      return true;
    } else {
      return false;
    }
  }

  includes(value) {
    var check = this.preOrderDfs(this.root, value, function (node, value) {
      if (node.data === value) {
        return true;
      }
    });
    return check;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree(arr);
myTree.prettyPrint(myTree.root);
// console.log(myTree.includes(1));
myTree.insert(6);
myTree.prettyPrint(myTree.root);
