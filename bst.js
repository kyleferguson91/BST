class Node {
    constructor(data, left,right){
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  
  function node(data,left,right) {
  return {
   data: data,
   left: left,
   right: right
  }
  } 
  
  class Tree{
    constructor(array) {
      this.array = array;
    }
    root = 'dogs';
    bed(){
      return 'bed'
    }
  }
  
  
  function tree(array) {
    return {
  array: array,
  root: null
    }
  }
  
  let me = new Tree()
  console.log(me.root)
  let see = tree()
  console.log(see)
  
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
  
  
  