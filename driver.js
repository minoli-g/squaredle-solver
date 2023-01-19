var dictionary = new TrieNode();

window.onload = function() {
    console.log("Onload fn check")

    for (let word of wordList3){
        dictionary.addWord(word);
    }
 }


 var button = document.getElementById("submitBtn");
     
 function onSubmit() {
    try {
        var str = document.getElementById("boardStr").value.toString().toLowerCase();
        
        let aa = new Board(str);

        for (let i=0; i<aa.size; i++){

            for (let j=0; j<aa.size; j++){
                aa.dfs( [i,j], "", new Set(), dictionary);
            }
        }

        let ansArray = Array.from(aa.answers);
        ansArray.sort( (a,b) => a.length - b.length );

        document.getElementById("solnOverview").innerHTML = ansArray.length + " words";
        document.getElementById("solutionList").innerHTML = ansArray;
    }
    catch(err){
        console.log(err.message)
        document.getElementById("solnOverview").innerHTML = err.message;
        document.getElementById("solutionList").innerHTML = "";
    }
}