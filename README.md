# squaredle-solver
A solver for the popular word-finding game Squaredle (https://squaredle.app).

A mobile-friendly website with processing done entirely client-side.
Available at https://minoli-g.github.io/squaredle-solver/ 


## Logic
The solution code is entirely in JavaScript. Read on for an explanation of the underlying logic and design decisions.

### Storing the corpus of valid English words

The Trie data structure provides an efficient way to store a huge corpus of words. You can think of a Trie as a sort of tree, each node being a letter.
This means that the path to each node from the root will represent a series of letters, forming a word or a prefix to a word. 

If we limit each node to having a maximum of 26 children, one for each letter in the alphabet, we've created a data structure that can
hold any word consisting of English letters. And we can give each node a Boolean property to represent whether it is the last letter of a word.

<img src="https://epi-rsc.rsc-cdn.org/globalassets/20-data-science/3236_christmastrie_f2a_1600.jpg?version=4704bac4&width=1120&format=jpg&quality=60"
     alt="Diagram of a Trie storing the words 'to','tea' and 'ted', among others."
     title="Diagram of a Trie storing the words 'to','tea' and 'ted', among others. Image courtesy of Wikipedia"
     style="width: 300px;">
  
 Accessing a particular letter node from its parent would take `O(1)` time, whether you store the children in an array of fixed size 26 or in a hashmap. 
  The former method, however, can be space-inefficient, as we'd need to have an array of size 26 stored in every single node, whether or not that node actually has
  26 children. (For example, there aren't any words with the prefix 'zx', so our first-level 'z' node wouldn't need to have space reserved for a child with letter 'x'.)
  
 So, inserting and finding a word in a Trie would take `O(k)` time, where k is the length of the word. You'll notice that this is independent of the size of the Trie.
  For comparison, finding a word in an unsorted list would take `O(n)` time, and `O(logn)` time in a sorted one - n being the total number of words stored.
  A hashtable would theoretically do it in `O(1)`, but in practice would be inefficient for the huge volume of data, due to collisions and chaining.
  
 I used the corpus of words from https://github.com/dwyl/english-words/, with all words below 4 letters removed 
 (because Squaredle only accepts words that are 4 letters or longer).
  
 ### Traversing the game board
 
  The next question is how to store a game board and iterate through all possible paths to look for words. 
  I chose to store the board in a 2D array of letters, and to move through the matrix using a set of hard-coded directional information. 
  
  It is completely possible to write logic that computes on-the-fly the addresses of all possible neighbours of a letter. But this involves a lot of `if` conditions,
  checking for (literal) edge cases, and overall extra processing. So I chose to hardcode hashmaps storing every address and its neighbours. 
  Squaredle only has three possible board sizes, so only three hashmaps were needed, of sizes 9, 16 and 25.
  
  ### Finding solution words in the board
  
  The brute-force approach to finding solution words would be to go down every possible path and check whether it represents a valid word. 
  However, this would take more time than necessary. (Remember our previous example where we assumed no words start with 'zx'? If those two letters happened
  to be adjacent on a board, time would be wasted traversing every path beginning with those two.)
  
  So we'll traverse the board in tandem with traversing our Trie. If we're at the letter 'z' on the board, and notice that the 'z' node in the Trie 
  doesn't have a 'x' child, we can
  skip the neighbour 'x' on the board and move on to finding paths through 'z's other neighbours which could contain valid words. 
  This ensures that we only go down a board path if at least one valid word is waiting at the end.
  
  
  ## Code
  
  The source code has a flat folder structure - it's not too complicated.
  - `index.html` : the single HTML page visitors will see. Contains the form for input, and pulls in the JS files containing the logic.
  - `words3.js` : the corpus of words stored in an array for easy importing. 
  - `solver.js` : Defines the classes for the Trie and Board.
  - `driver.js` : Loads the corpus into a Trie as soon as the window is loaded. Gets form input, does the processing, and updates the UI with the answer list.
  - `graph.js` : Stores the hard-coded directional information for each of the 3 possible board sizes.


---

This is a simple side project, and has room for improvement.
If you'd like to contribute, feel free to make a fork and open a pull request with your changes. Specify what you've changed and why.

