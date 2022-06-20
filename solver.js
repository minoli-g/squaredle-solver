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

                this.nodes.set( [i,j], this.board[i][j]);

            }
        }
        this.fillGraph();
        console.log(this.graph);
    }

    fillGraph(){
        for (let i=0; i<this.size; i++){
            for (let j=0; j<this.size; j++){

                let neighbours=[];

                if (i>0) {
                    neighbours.push( [i-1,j] );  // North
                    if (j>0){
                        neighbours.push( [i-1, j-1] )  // North-west
                    }
                    if (j<this.size-1){
                        neighbours.push( [i-1, j+1] )  // North-east
                    }
                }
                if (j>0){
                    neighbours.push( [i, j-1] ); // West
                }
                if (i<this.size-1){
                    neighbours.push( [i+1, j] ); // East
                    if (j>0){
                        neighbours.push( [i+1, j-1] ); // South-west
                    }
                    if (j<this.size-1){
                        neighbours.push( [i+1, j+1] ); // South-east
                    }
                }
                if (j<this.size-1){
                    neighbours.push( [i, j+1] ); // South
                }

                this.graph.set( [i,j], neighbours);
            }
        }
    }
}
