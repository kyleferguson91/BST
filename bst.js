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


  // we can now do things with this array..

  if (arr.length < 2)
  {
    // we return arr[0] in the case it is defined
    // otherwise we return null!
   if (arr[0] != undefined) 
   {
    // we have only one item in array, we return that as the data note
    // and set the left and right equal to null as we have no more arrays left
    return node(arr[0], null, null)
   }
   else {
    // otherwise we have an empty array, and must return null
    return node(null,null,null)
   }
  }


  let mid = Math.floor(arr.length/2)
  let left = arr.slice(0,mid)

  let right = arr.slice(mid+1)
  //console.log(left, 'left', right, 'right', mid, 'mid')

  return node(arr[mid], buildTree(left), buildTree(right))
  

}

//console.log(buildTree([1,2,3,4]))


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
let root = buildTree([1,2,3,4,5,6,7,8,9,10]);
//console.log(root.left, 'root')



console.log(prettyPrint(root))