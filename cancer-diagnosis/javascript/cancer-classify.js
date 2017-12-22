var CLASSIFICATION_INDEX = 10;
var K = 5;
var BENIGN = 2;
var MALIGNANT = 4;

d3.text("train_data.csv", "text/csv", function(text) {
  var trainData = d3.csv.parseRows(text, function(d) {
    return d.map(Number);
  });
  d3.text("test_data.csv", "text/csv", function(text) {
    var testData = d3.csv.parseRows(text, function(d) {
      return d.map(Number);
    });
    console.log(testData);
    console.log(trainData);
    kNN(testData, trainData);
  })
});

function kNN(testData, trainData) {
  /* Array of 2s and 4s, one element for each test instance.
	   You will be filling this array in this function. */
  var myResults = [];
  for (var i = 0; i < testData.length; i++) {
    var testInstance = testData[i];

    /* Calculate the distance between testInstance and each train instance.
		   Store the top K results (the K train instances with the shortest
		   distances to testInstance) in topResults.
		   Hint: JavaScript's sort() function will be useful for this. */
    var topResults = [];

    /* Classify the testInstance based on topResults.
		   Choose the classification that appears most frequently in topResults.
		   Store the classification in myResults. */

  }
  console.log(printAccuracy(myResults, trainData, testData));
}

// Calculates the Euclidean distance between two data instances.
// TODO: Complete this function.
function calculateDistance(instance1, instance2) {}

// Computes accuracy of given results array.
function printAccuracy(myResults, trainData, testData) {
  if (myResults.length !== testData.length) {
    return "Please provide exactly one classification for each test instance.";
  }
  var totalTestInstances = testData.length;
  var correctClassifications = 0;
  for (var i = 0; i < myResults.length; i++) {
    var currResult = myResults[i];
    var correctResult = testData[i][CLASSIFICATION_INDEX];
    if (currResult === correctResult) {
      correctClassifications++;
    }
  }
  var percentAccuracy = correctClassifications / totalTestInstances * 100;
  percentAccuracy = percentAccuracy.toFixed(2);
  return percentAccuracy;
}
