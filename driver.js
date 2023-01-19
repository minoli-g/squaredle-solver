var dictionary = new TrieNode();

window.onload = function() {
    console.log("Onload fn check")

    for (let word of wordList3){
        dictionary.addWord(word);
    }
 }


 var button = document.getElementById("submitBtn");

function prettySortAnswers(ansArray){

    ansArray.sort();
    ansArray.sort( (a,b) => a.length - b.length );

    let n = ansArray.length;
    let pretty = n + " words found.";
    let prevWord = "";

    for(let word of ansArray){
        if (word.length > prevWord.length){
            pretty += "<br><br>" + word.length + " letter words: <br><br>";
        }
        pretty += "\t" + word;
        prevWord = word;
    }
    return(pretty);
}

     
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
        pretty = prettySortAnswers(ansArray);
        document.getElementById("solutionList").innerHTML = pretty ;
    }
    catch(err){
        console.log(err.message)
        document.getElementById("solutionList").innerHTML = err.message;
    }
}