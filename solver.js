class TrieNode {
    
    constructor(){
        this.children = new Map(); //Map the letter to a new TrieNode
        this.eow = false; // Boolean to indicate if this is the last letter
    }
    
    addWord(word){
        
        let curr = this;        
        for (let i=0; i<word.length; i++){
            let letter = word[i];

            if ( curr.children.get(letter) == null){
                curr.children.set(letter, new TrieNode());
            }
            curr = curr.children.get(letter);
            if (i == word.length-1){
                curr.eow = true;
            }
        }
    }

    check(word){
        let curr = this;
        for (let letter of word){
            if (curr.children.get(letter) == null){
                return false;
            }
            curr = curr.children.get(letter);
        }
        if (curr.eow){
            return true;
        }
        return false;
    }
}

class Board {

    constructor(boardStr){

        this.validate( boardStr );

        let arr = boardStr.split("-");
        this.board = [];
        for (let item of arr){
            this.board.push(item.split(""));
        }

        this.size = arr.length;
        this.answers = new Set();
    }

    validate( boardStr ){

        // Split the string into individual rows
        let arr = boardStr.split("-");

        // Check whether each row has the same length
        for (let item of arr){
            if (item.length !== arr.length){
                throw new Error("Board does not represent a square. Please re-check your input");
            }
        }

        // Check whether the size is valid
        if (arr.length < 3 ){
            throw new Error("Minimum board size is 3");
        }
    }

    dfs( address, wordSoFar, pathSoFar, trie){

        // Check whether this letter makes a valid prefix
        let newTrie = trie.children.get(this.board[address[0]][address[1]]);
        if (newTrie == null){
            return;
        }
        // Check whether this letter is EOW
        let updatedWord = wordSoFar + this.board[address[0]][address[1]];
        if (newTrie.eow){
            this.answers.add(updatedWord);
        }

        pathSoFar.add(this.encode(address));

        for (let nb of this.getNBs(address)){
            // For each neighbouring letter...
            
            if ( !(pathSoFar.has(this.encode(nb))) ){  
                // If the nb is not in the path    
                this.dfs( nb, updatedWord, pathSoFar, newTrie );
            }
        }
        pathSoFar.delete(this.encode(address));
    }

    encode(address){
        return this.size*address[0] + address[1] + 1;
    }

    getNBs(address){
        let dirs = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        let arr = [];

        for (let dir of dirs){
            let x = address[0] + dir[0];
            let y = address[1] + dir[1];

            if (x>=0 && x<this.size && y>=0 && y<this.size){
                arr.push([x,y]);
            }
        }
        return arr;
    }
}
