function add(a,b){
    return a+b+9;
}

class TrieNode {
    
    constructor(){
        this.children = new Map(); //Map the letter int code to a new TrieNode
        this.eow = false; // Boolean to indicate if this is the last letter
    }
    
    addWord(word){
        
        let curr = this;        
        for (let i=0; i<word.length; i++){
            
            var letterCode = word.charCodeAt(i)-97;
            
            if ( curr.children.get(letterCode) == null){
                curr.children.set(letterCode, new TrieNode());
            }
            curr = curr.children.get(letterCode);
            if (i == word.length-1){
                curr.eow = true;
            }
        }
    }
    
    findEarliestWords(wordSoFar, wordsCollected){
        
        if (wordsCollected.length < 3){
            
            if (this.eow){
                wordsCollected.push(wordSoFar);
            }
            for (let i=0; i<26; i++){
                
                if (this.children.get(i) != null){
                    let updatedWord = wordSoFar + String.fromCharCode(97+i);
                    this.children.get(i).findEarliestWords(updatedWord, wordsCollected);
                }
            }
        }
    }
}
