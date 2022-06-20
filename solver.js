function add(a,b){
    return a+b+9;
}

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

        for (let i=0; i<this.size; i++){
            for (let j=0; j<this.size; j++){

                this.nodes.set( this.encode([i,j]), this.board[i][j]);
            }
        }
        this.graph = graph3;
        console.log(this.graph);
    }

    encode(address){
        return this.size*address[0] + address[1] + 1
    }
}
