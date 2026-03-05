class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(myArr) {
    this.root = this.buildTree(
      this.removeDuplicate(this.mergeSort(myArr)),
      0,
      myArr.length - 1
    );
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

  includes(value, node = this.root) {
    if (node === null) {
      return;
    }
    if (this.includes(value, node.left)) {
      return true;
    } else if (this.includes(value, node.right)) {
      return true;
    } else if (node.data === value) {
      return true;
    } else {
      return false;
    }
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

  deleteItem(value, node = this.root) {
    if (node === null) {
      return;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else if (node.data === value) {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null || node.right === null) {
        var temp = node.left !== null ? node.left : node.right;
        node = null;
        node = temp;
        return node;
      } else {
        var curNode = node.right;
        var successor;
        while (curNode !== null && curNode.left !== null) {
          curNode = curNode.left;
          successor = curNode;
        }
        var temp = node;
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right);
      }
    }

    return node;
  }

  deletecheck(node = this.root) {
    if (node == null) return;

    console.log(node.data);
    this.deletecheck(node.left);
    this.deletecheck(node.right);
  }

  levelOrderForEach(callback, node = this.root, level = 1) {
    if (node === null) {
      return;
    }
    console.log(node.data);
    this.levelOrderForEach(callback, node.left);
    this.levelOrderForEach(callback, node.right);
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree(arr);
// myTree.prettyPrint(myTree.root);
// console.log(myTree.includes(1));
// myTree.insert(6);
myTree.prettyPrint(myTree.root);
myTree.deleteItem(9);
myTree.prettyPrint(myTree.root);
myTree.deletecheck();
// myTree.levelOrderForEach(function (data) {
//   console.log(data);
// });
