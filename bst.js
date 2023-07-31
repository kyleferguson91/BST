
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

find: function(value, currentnode = this.root){
// this function accepts a value and returns a node with given value 



  // this condition will take care of the value not being in the tree
  // we run this first so we don't get an error trying to read from a null node
  if (!currentnode) 
  {
    console.log('value is not in the tree! Returning')
    return;
  }


  // we will traverse the tree similar to how we have been..
  // if we have found the value we are done, but if we reach null before finding the value
  // we are done and could not find the value

  if (currentnode.data == value)
  {
    console.log('found the value, returning', currentnode)
    return currentnode;
  }



  // else we go deeper into the tree
  if (value > currentnode.data)
  {
    // value is greater so must lie on right side..
    this.find(value, currentnode.right)
  }
  else {
    // else its lesser, lies on left side
    this.find(value,currentnode.left)
  }


},

levelorder: function(functionparam = null, currentnode = this.root, queue = [this.root], stored = []){


// while the queue has something in it, do this
while (queue.length != 0)
{
  // call the function on the current node.. if not null
  if (functionparam) {
    functionparam(currentnode)
  }


// log the data in the current node
  // add it to the stored array..
  stored.push(currentnode.data)

// if currentnode has a left node, add it to the queue
  if (currentnode.left)
  {
    queue.push(currentnode.left)
  }
  // if currentnode has a right node add it to the queue
  if (currentnode.right) {
    queue.push(currentnode.right)
  }
  // remove the current node we are working on..
  queue.shift()
  // call the function again until we reach the end of the queue
  // at which point we return
// if we never passed a function argument, call the function again without it


 if (functionparam == null) 
 {
  //console.log('nofunct')
  this.levelorder(null, queue[0], queue,stored)
 }
 // but if we did pass one, call the function again with currentnode..
 else {


  this.levelorder(functionparam, queue[0], queue,stored)
 }

}

if (queue.length == 0 && functionparam == null)
{
  // once we reach end of queue, if no function provided return an array of values

  return stored;

}

else {

  // function has been provided this is the very end..

  return 'function provided initially and passed'
}


},

inorder: function(functionparam = null, currentnode = this.root, stored = []){
//inorder is L D R - 
// if left node exists go to left
if (currentnode.left) 
{
this.inorder(functionparam,currentnode.left,stored)
}
// once no more left nodes exists read the data
//console.log(currentnode.data)

// yield node to function as long as it is not null

if (functionparam) {
  
  functionparam(currentnode)
}
stored.push(currentnode.data)

// if right node exists go to right
if (currentnode.right) 
{
this.inorder(functionparam, currentnode.right,stored)
}

// at the end of all function calls we will either return an array or a function
if (!functionparam) {
  return stored
}
else {
  return 'func provided'
}

},


preorder:  function(functionparam = null, currentnode = this.root, stored = []){

  // data, left, right
// read the data in the node

 // console.log(currentnode.data)
  stored.push(currentnode.data)
  if (functionparam) {
    functionparam(currentnode)
  }

  // if left node exists go to left
  if (currentnode.left) 
  {
  this.preorder(functionparam,currentnode.left, stored)
  }

  
  // if right node exists go to right
  if (currentnode.right) 
  {
  this.preorder(functionparam, currentnode.right,stored)
  }
  // when function is over, if we did not have a function that we were passing nodes into, return the array

  if (!functionparam) {
    return stored
  }

  },

postorder:  function(functionparam = null, currentnode = this.root, stored = []){
  //post order is LRD - 
  // if left node exists go to left
  if (currentnode.left) 
  {
  this.postorder(functionparam,currentnode.left,stored)
  }

  
  // if right node exists go to right
  if (currentnode.right) 
  {
  this.postorder(functionparam, currentnode.right, stored)
  }
    // once no more left nodes exists read the data
   // console.log(currentnode.data)

    stored.push(currentnode.data)
    if (!functionparam) {
      return stored
    }
    else {
      functionparam(currentnode)
    }
  
  },

  height: function(node){
    
// Height is defined as the number of edges in longest path from a given node to a leaf node.
// if we reach a leaf node, return -1, this helps us ensure we didn't count
// initial node
if (!node) {return -1}


// how do we find height
// we compare the height in the left child and right child
// well how do we have the height
// we have a function for findind height ... this function!
// we return the larger of the two heights 
// and then add 1 for our current step, and continue down the longer path
// we continue until we reach a null node (a leaf) at which point we can return




//console.log(node.data)

// how do we find the height..
// we compare the longer of the two siddes

// count the left side of the node
if (this.height(node.left) >= this.height(node.right)) {
  return 1 + this.height(node.left)
}
else {
  return 1 + this.height(node.right)
}

// cound the right side of the node


// return the greater of the two sides

 
// console.log(leftcount, rightcount,'left right')
  },

  depth: function(node, currentnode = this.root)
  {
    // the depth of a node is the number of edges from the node to the trees root node..
    // well it is not easy to go from a node back up to root node as we do not have the back link to it, but we can traverse from the root node to provided node and count the iterations..

    if (node == this.root) {
      return 0
    }
    if (currentnode == node) {
      return 0;
    }

    else {
       // else the node passed is not the root, we want to traverse from the root to the node and count how many times it takes..
       
       // compare the value
       if (node.data < currentnode.data)
       {
        // if the value in the node is less than the root node it must lie to the left
        return 1 + this.depth(node, currentnode.left)
       }
       else 
       {
return 1 + this.depth(node, currentnode.right)
       }

    }




  },
  isbalanced: function(currentnode = this.root) 
  {

    // if we pass a null node, return
    if (!currentnode) {return }
    
      // else look at the height of the left and right subtrees of this node
let heightleft = this.height(currentnode.left)
let heightright = this.height(currentnode.right)

//console.log(heightleft, heightright, currentnode.data)

if (heightleft >= heightright)
{
  if (heightleft - heightright > 1) {
    return false
  }
}
else {
  if (heightright - heightleft > 1){
    return false
  }
}

// if we have not reached a false yet, continue on to the next two nodes (if we pass a node that doesn't exist it will be returned above)
// we will continue until we reach each null node
// when all finally done we return true
// we call isbalanced on the nodes, which will call is height for each node
    this.isbalanced(currentnode.right), this.isbalanced(currentnode.left)
    

    // otherwise we reached the end, return true!
return true
  },



  rebalance: function(currentnode = this.root, newarr=  []) {

let balancedtree = tree( this.levelorder())


  return balancedtree


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
    // otherwise we have an empty array (no values left to append to tree), and must return null
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

//
//let newtree = tree([-10,-3,0,5,6,7,12]);
//console.log(newtree, 'newtree')
////newtree.insert(-16)
////newtree.insert(13)
////newtree.insert(15)
////newtree.insert(17)
////newtree.insert(-14//)

//console.log(newtree.print())
//newtree.insert(12)

//newtree.delete(11)
//newtree.print()
////newtree.find(-3)
//function printnode(currentnode) 
//{
//  console.log(currentnode.data, 'printnodecall')
//}
//console.log(newtree.levelorder())
//console.log(newtree.inorder())
//console.log(newtree.preorder(printnode))
//console.log(newtree.postorder(printnode))
//console.log(tree([-10,-3,0,5,9]).print())

//console.log(newtree.height(newtree.root.right.left  ))
//console.log(newtree.isbalanced())
//console.log(newtree.rebalance())



function driverScript(){

  let arr = []

    // create an array of 100 numbers random
  while (arr.length < 100)
  {
    let num = Math.floor(Math.random()*100)
    if (arr.length % 2 == 0)
    {
      num *= -1
    }
    arr.push(num)
  }

 
// create a tree from this array 
  let  newtree = tree(arr)
  //newtree.print()

  // confirm if tree is balanced
  console.log(newtree.isbalanced(), 'tree balanced')

  //print of level, pre post and inorder..

  //console.log(newtree.levelorder(), 'levelorder', newtree.preorder(), 'preorder', newtree.inorder(), 'inorder', newtree.postorder(), 'postorder')

  // unbalance the tree

  let counter = 0
  while (counter < 102)
  {
    let num = Math.ceil(Math.random()*100)
    newtree.insert(num)
    counter++
  }

//console.log(newtree.print())
console.log(newtree.isbalanced(), 'tree balanced')

// rebalance the tree, we set new tree equal to the balanced tree which returns a new tree 
newtree = newtree.rebalance()


// confirm tree is balanced
console.log(newtree.isbalanced(), 'is balanced')

newtree.print()

console.log(newtree.levelorder(), 'levelorder', newtree.preorder(), 'preorder', newtree.inorder(), 'inorder', newtree.postorder(), 'postorder')


}


driverScript()