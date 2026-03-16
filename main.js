class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(myArr) {
    this.fixArr = this.removeDuplicate(this.mergeSort(myArr));
    this.root = this.buildTree(this.fixArr, 0, this.fixArr.length - 1);
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

  levelOrderForEach(callback, levelnode = [], node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (levelnode.length == 0 || levelnode.length == null) {
      levelnode.push(node);
    }

    if (levelnode[0] !== null) {
      callback(levelnode[0].data);
    } else {
      return;
    }

    var nextLevel = levelnode.shift();
    if (nextLevel.left == null) {
      levelnode.push(nextLevel.right);
    } else if (nextLevel.right == null) {
      levelnode.push(nextLevel.left);
    } else {
      levelnode.push(nextLevel.left);
      levelnode.push(nextLevel.right);
    }
    this.levelOrderForEach(callback, levelnode);
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (node === null) {
      return;
    }

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (node === null) {
      return;
    }

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function");
    }

    if (node === null) {
      return;
    }

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  height(value, node = this.root, level = 0) {
    if (node === null) {
      return;
    }

    if (node.data === value) {
      return level;
    } else {
      level++;
    }

    var levelLeft = this.height(value, node.left, level);
    var levelRight = this.height(value, node.right, level);

    if (levelLeft !== undefined) {
      return levelLeft;
    } else if (levelRight !== undefined) {
      return levelRight;
    } else {
      return undefined;
    }
  }

  depth(value, node = this.root, level = 0) {
    if (node === null) {
      return;
    }

    if (node.data === value) {
      return level;
    }

    var levelLeft = this.depth(value, node.left, level);
    var levelRight = this.depth(value, node.right, level);

    if (levelLeft !== undefined) {
      levelLeft++;
      return levelLeft;
    } else if (levelRight !== undefined) {
      levelRight++;
      return levelRight;
    } else {
      return undefined;
    }
  }

  isBalanced(node = this.root) {
    function dfs(node) {
      if (node === null) return [true, 0];

      var left = dfs(node.left);
      var right = dfs(node.right);
      var balanced = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

      return [balanced, 1 + Math.max(left[1], right[1])];
    }
    return dfs(node)[0];
  }

  rebalance(node = this.root) {
    var newArr = new Array();
    this.inOrderForEach(function (data) {
      newArr.push(data);
    }, node);

    this.root = this.buildTree(newArr, 0, newArr.length - 1);
  }
}

// const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//1.
var arrayGenerator = function (max) {
  var newArey = new Array();
  for (var i = 0; i < max; i++) {
    newArey.push(Math.floor(Math.random() * 100));
  }

  return newArey;
};
var myArray = arrayGenerator(10);
var mytree = new Tree(myArray);

//2.
console.log(myArray);
mytree.prettyPrint(mytree.root);
console.log(mytree.isBalanced());

//3.
console.log("level order: ");
mytree.levelOrderForEach(function (data) {
  console.log(data);
});
console.log("pre order: ");
mytree.preOrderForEach(function (data) {
  console.log(data);
});
console.log("post order: ");
mytree.postOrderForEach(function (data) {
  console.log(data);
});
console.log("in order: ");
mytree.inOrderForEach(function (data) {
  console.log(data);
});

//4.
mytree.insert(101);

//5.
console.log(mytree.isBalanced());
mytree.prettyPrint(mytree.root);
//6.
mytree.rebalance();

//7.

console.log(mytree.isBalanced());
mytree.prettyPrint(mytree.root);

//8
console.log("level order: ");
mytree.levelOrderForEach(function (data) {
  console.log(data);
});
console.log("pre order: ");
mytree.preOrderForEach(function (data) {
  console.log(data);
});
console.log("post order: ");
mytree.postOrderForEach(function (data) {
  console.log(data);
});
console.log("in order: ");
mytree.inOrderForEach(function (data) {
  console.log(data);
});
