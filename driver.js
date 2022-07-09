var dictionary = new TrieNode();

window.onload = function() {
    console.log("Onload fn check")

    for (let word of wordList2){
        dictionary.addWord(word);
    }
 }


 var button = document.getElementById("submitBtn");
     
 function onSubmit() {
    try {
        var str = document.getElementById("boardStr").value.toString().toLowerCase();
        
        let aa = new Board(str);
        for (let i=1; i< (aa.size**2) +1; i++){
            aa.dfs(i, "", new Set(), dictionary)
        }
        console.log(aa.answers);
        document.getElementById("solutionList").innerHTML = Array.from(aa.answers);
    }
    catch(err){
        console.log(err.message)
    }
}