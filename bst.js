
function node(data,left = null,right = null) {
return {
 data: data,
 left: left,
 right: right
}
} 


function tree(array) {
  return {
array: array,

root: buildTree(array),

print: function (node = this.root, prefix = "", isLeft = true)  {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
},
insert: function(value, node = this.root)
{


  // look at the current node..
  // if its equal to the value we want to insert, return as we don't need to do aything 
  if (node.data == value) {
    return 'same'
  }
  // otherwise
  if (value > node.data)
  {
    console.log('greater', node.data)
    // greater than current node call function one level to the right
    if (!node.right) {
   
      node.right = value;
      console.log(`input for greater to right of ${node.data}`)

      
    }

    this.insert(value,node.right)
  }
  if (value < node.data)
  {

// less than current node, call function one level to the left..
if (!node.left) {
  console.log(`input for lesser to left of ${node.data}`)
  node.left = value;

}
this.insert(value,node.left)

  }



}


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
    // we set nodes 
    return node(null,null,null)
   }
  }

// find the midpoint of thhe array, 
// create the left side
// and then the right (not including the mid element which will become the data note )
  let mid = Math.floor(arr.length/2)
  let left = arr.slice(0,mid)

  let right = arr.slice(mid+1)
  //console.log(left, 'left', right, 'right', mid, 'mid')
  // for each call we return node, with the data equal to the midpoint of the current array..
  // and the left tree will be equal to the next which is an node object again with data set to the middle
  // of the tree and its left and right node set to further calls
  // we only stop recursing when we pass an array with a length that is less than 2 which returns
  // the data for the node, and null for the respective left right
  // until we resolve to one of the base cases..
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




//console.log(prettyPrint(tree([-10,-3,0,5,9]).root))
//console.log(tree([1,2,3,4]))


console.log(tree([-10,-3,0,5,9]).insert(6))
console.log(tree([-10,-3,0,5,9]).print())