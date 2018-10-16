document.addEventListener("DOMContentLoaded", function(event) { 

  // Const's and Var's
  const textInField = document.getElementById('textInput')
  const sentimentField = document.getElementById('sentimentVal')

  // load wordvectors
  const wordVectors = ml5.word2vec('https://raw.githubusercontent.com/ml5js/ml5-data-and-models/master/models/wordvecs/common-english/wordvecs10000.json', () => console.log("Loaded"))

  // Functions
  getSentiment = (input) => {
    console.log(input)
    // Find the closest word to 'rainbow'
    wordVectors.nearest(input, function(err, results) {
      if(err) return
      var words = "";
      console.log(results);

      for (let i = 0; i < results.length; i++) {
        const w = results[i];
        words += w.word + ", "
      }

      sentimentField.innerHTML = words
    });
  }
  
  
  
  
  // Event Listeners
  textInField.addEventListener('input', (e) => getSentiment(e.target.value))

})