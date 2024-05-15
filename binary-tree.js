/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(this.root === null){
      return 0;
    }

    let toVisitStack = [this.root];
    let depthCount =1;

    while (toVisitStack.length) {
      let current = toVisitStack.shift();

      if(current.left || current.right){
        depthCount+=1;
      } 

      if(!(current.left && current.right)){
        return depthCount;
      }

      toVisitStack.push(current.left)
      
      toVisitStack.push(current.right)
    }
    return depthCount;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(this.root === null){
      return 0;
    }

    let toVisitStack = [this.root];
    let depthCount = 1;

    while (toVisitStack.length) {
      let current = toVisitStack.shift();

      if(current.left || current.right){
        depthCount+=1;
      } else{
        return depthCount;
      }
    

      if(current.left.right || current.left.left){
        toVisitStack.push(current.left)
      }
      if(current.right.right || current.right.left){
        toVisitStack.push(current.right)
      }
      
    }
    return depthCount;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  //I NEED TO REVISIT THIS
  //HAD TO REFER TO SOLUTION
  maxSum() {
    let result = 0;

    //return max path sum without split
    function maxSumHelper(node) {
      if (node === null) return 0;
      //this is going to recursively go to the bottom of the nodes and find the bottom node sums
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);

      //update the result if a node and a straight path through its children returns the maxSum found so far
      //compute max path WITH split and update result if its bigger than current max path result
      result = Math.max(result, node.val + leftSum + rightSum);
      //return the max path of a particular node: either left or right
      //make sure you aren't adding negative numbers by including a zero in your Math.max comparing function

      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(this.root === null){
      return null;
    }

    let nextLarger = null;
    let toVisitStack = [this.root];
    
    while (toVisitStack.length) {
      let current = toVisitStack.shift();

      if(nextLarger){
        if((current.val < nextLarger) && (current.val > lowerBound)){
          nextLarger = current.val
        }
      } else{
          if((current.val > lowerBound)){
          nextLarger = current.val}
      }

      if(current.left){
        toVisitStack.push(current.left)
      }
      if(current.right){
        toVisitStack.push(current.right)
      }
    }
    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if(tree.root === null){
      return 0;
    }

    let toVisitStack = [tree.root];
    let string = "";

    
    while (toVisitStack.length) {
      let current = toVisitStack.shift();
      string+=current.val;
  
      if(current.val !== 'x'){
        if(current.left){
        toVisitStack.push(current.left)
      } else{
        toVisitStack.push({val: "x", left: null, right: null});
      }

      if(current.right){
        toVisitStack.push(current.right)
      } else{
        toVisitStack.push({val: "x", left: null, right: null});
      }
      }
    }
    return string;
   
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    let myTree;
    let stringArray = Array.from(stringTree);
    if(stringArray.length === 0){
      return null;
    }
    let mainRoot = null;

    while (stringArray.length) {
      let currentRootVal = stringArray.shift();
      let currentRoot = new BinaryTreeNode(+currentRootVal);
      if(!mainRoot){
        mainRoot = currentRoot
      }
      let leftNodeVal = stringArray.shift();
      let leftTreeNode = new BinaryTreeNode(+leftNodeVal);
      let rightNodeVal = stringArray.shift();
      let rightTreeNode = new BinaryTreeNode(+rightNodeVal);
  
      currentRoot.left = leftTreeNode;
      currentRoot.right = rightTreeNode;
    
    }
    myTree = new BinaryTree(mainRoot);
    return myTree;
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
