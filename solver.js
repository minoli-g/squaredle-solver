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
        let arr = boardStr.split("-");
        
        this.board = [];
        for (let item of arr){
            this.board.push(item.split(""));
        }

        this.size = arr.length;
        this.nodes = new Map();
        this.graph = new Map();
        this.answers = [];

        for (let i=0; i<this.size; i++){
            for (let j=0; j<this.size; j++){

                this.nodes.set( this.encode([i,j]), this.board[i][j]);
            }
        }
        if (this.size == 3){
            this.graph = graph3;
        }
        if (this.size == 4){
            this.graph = graph4;
        }
        if (this.size == 5){
            this.graph = graph5;
        }
    }

    dfs( address, wordSoFar, pathSoFar, trie){

        // Check whether this letter makes a valid prefix
        let newTrie = trie.children.get(this.nodes.get(address));
        if (newTrie == null){
            return;
        }
        // Check whether this letter is EOW
        let updatedWord = wordSoFar + this.nodes.get(address);
        if (newTrie.eow){
            this.answers.push(updatedWord);
        }

        pathSoFar.add(address);

        for (let nb of this.graph.get(address)){
            // For each neighbouring letter...
            
            if ( !(pathSoFar.has(nb)) ){  
                // If the nb is not in the path
    
                this.dfs( nb, updatedWord, pathSoFar, newTrie );
            }
        }
        pathSoFar.delete(address);
    }

    encode(address){
        return this.size*address[0] + address[1] + 1
    }
}
