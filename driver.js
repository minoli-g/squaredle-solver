window.onload = function() {
    console.log("Onload fn check")

    let dictionary = new TrieNode();
    for (let word of wordList){
        dictionary.addWord(word);
    }
    console.log(dictionary)
    
    let aa = new Board("axy-fge-ids");
    
    for (let i=1; i<10; i++){
        aa.dfs(i, "", new Set(), dictionary)
    }
    console.log(aa.answers);
 }