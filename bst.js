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


  function buildTree(arr){
    // first lets sort the tree..
   let sorted = arr.sort((a,b) => {
      return a-b
    })

    // now remove duplicates..
    sorted.map((elem,ind,arr) => {
      // if the index of the element, starting from the next index is not equal to -1 (not there), then remove that element!

      if (arr.indexOf(elem, ind+1) != -1)
      {
        // 
        arr.splice(ind,1)
      }
    })

  
    // our sorted and duplicate filtered array is now stored in sorted..
    return sorted;

    // we can now do things with this array..
    

  }

  console.log(buildTree([1,3,3,4,5,19,19,4,11,5]))
  
  
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
  
  
  