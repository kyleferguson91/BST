
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


insert: function(value, currentnode = this.root)
{

if (currentnode.data == value)
{
  return
}


  if (value > currentnode.data)
  {
    // look to the right subtree
    if (currentnode.right == null)
    {
      currentnode.right = node(value)
    }
    else {
      this.insert(value, currentnode.right)
    }


  }
  if (value < currentnode.data)
  {
    // look to the right subtree
    if (currentnode.left == null)
    {
      currentnode.left = node(value)
    }
    else {
      this.insert(value, currentnode.left)
    }


  }

},

delete: function(value, currentnode = this.root, priornode  = this.root) 
{

if (!currentnode) {
  console.log(value, 'not found for delete, returning')
  return
}

  if (currentnode.data == value )
  {
    // we found a match for the value..
    // we want to take care of case 1 here, for leaf nodes..
    // both children are null, leaf node 
    
// this covers the case of deleting a leaf node..
    if (currentnode.left == null && currentnode.right == null)
{    if (value < priornode.data)
    {

      priornode.left = null
    }
    else if (value > priornode.data) {
      
      priornode.right = null
    }
}

// next case 2 will check for presence of 1 child but not both..
// if current node left is truthy, and current right falsy (reversed so true)
// or current node left falsy (reversed to true) or current right truthy
if (currentnode.left && !currentnode.right || !currentnode.left && currentnode.right )
{
  
  // then do this/
  // point the prior node to the child of 32..
  if (currentnode.left) {
    
    // if the left side is the child do this
    // check if that value is larger or smaller then the priornode data
    // if smaller append to left of prior node
    // if larger append to right of prior node
    if (currentnode.left.data < priornode.data)
    {
      priornode.left = currentnode.left
    }
    else {
      priornode.right = currentnode.left
    }
  }
  if (currentnode.right) 
  {
   
    // if the right side is the child do this
    if (currentnode.right.data < priornode.data)
    {
      priornode.left = currentnode.right
    }
    else {
      priornode.right = currentnode.right
    }
  }

}


// last case will keep track of nodes with 2 children!

if (currentnode.left && currentnode.right)
{

  // find the thing that is next biggest from this value..
  // we look in the right subtree.. 
  // and find the thing in the far left of the right subtree..
console.log('current delete w/ 2 children', currentnode.data, priornode.data, '<-- prior')

// we want to move over to the right, and then all the way to the left..
let tempnode = currentnode.right
let priortotemp =  currentnode.right;

// if the first node in the right has no children, then we cannot go
// any further to the left..
// so we set the current nodes right to be null 
// ans swap the values
if (!currentnode.right.left && !currentnode.right.right) 
{
  currentnode.right = null
}

do {

  currentnode.data = tempnode.data
if (!tempnode.left) {


  priortotemp.left = null
  break;
}
else {
priortotemp = tempnode;

  tempnode = tempnode.left
}

}
while (tempnode)


}

  return
  }
   

   if (value < currentnode.data)
   {
    priornode = currentnode
    this.delete(value,currentnode.left,priornode )
   }
   else if (value > currentnode.data)
   {
    priornode = currentnode
    this.delete(value, currentnode.right, priornode)
   }


},

find: function(){

},


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
    // was getting a bug by returning an entire object with everything set to null
    // which was messing things up..
    //  as it went 
    //  
    // 
    // 
    // 
    // 
    // 
    // 
    return null
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


let newtree = tree([-10,-3,0,5,6,7,8,9,10,11,12,13]);
//console.log(newtree, 'newtree')
console.log(newtree.print())
//newtree.insert(12)
//newtree.insert(13)
//newtree.insert(15)
//newtree.insert(16)
newtree.delete(11)
newtree.print()


//console.log(tree([-10,-3,0,5,9]).print())