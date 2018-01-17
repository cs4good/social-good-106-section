/* CS106S Week 2: Cancer Diagnosis via KNN
 * Welcome! In this class, we will be looking at tumors and classifying them as benign or malignant.
 *
 * The method we will be using to do so is called K-Nearest Neighbors, or KNN. The way KNN works is as follows:
 * For each test point in our data, we try and find the K-most similar training points to that test point. After 
 * doing so, we look at these K-most similar training points, and determine whether a majority of these points are 
 * benign or malignant. Once we get this majority classification, we use this as our prediction for the test point.
 *
 * RUNNING THE CODE:
 * First, make sure that index.html runs the script "<script src="cancer-classify.js"></script>". 
 * index.html should NOT have "<script src="cancer-classify-no-d3.js"></script>"
 *
 * To run the code, navigate to the directory containing this file in Terminal and type "python -m SimpleHTTPServer"
 * Then open up your browser and navigate to "localhost:8000" (or whatever port your SimpleServer started on)
 * Then open up your console and check the output :D. Refresh the page to re-run the code!
 *
 * If the server does not work, you can instead use the cancer-classify-no-d3.js code, which only requires you to open the index.html file.
 * See cancer-classify-no-d3.js for more details.
 *
 * Edit the code where you see "TODO" to make this work! The code is heavily commented, but if you have any questions, do
 * not hesitate to raise your hand/ask an instructor :) 
 */

var CLASSIFICATION_INDEX = 10;  // index of the class for each training/test sample
var K = 5;                      // to classify each training example, we use the top K closest training examples. See below.
var BENIGN = 2;                 // Samples with classification of "2" are Benign
var MALIGNANT = 4;              // Samples with classification of "4" are Malignant

// Global variables for storing our samples. The d3 code below fills in these variables.
//  - trainingData: an Array of 628 training instances. Each training instance is represented as an Array with 11 values.
//  - testData: an Array of 71 test instances. Each test instance is represented as an Array with 11 values.
var trainData;            
var testData;

// (1) Right when we load the script, we read in our training data and test data from the CSV's and store into our global variables.
d3.text("train_data.csv", "text/csv", function(text) {
  trainData = d3.csv.parseRows(text, function(d) {
    return d.map(Number);
  });
  d3.text("test_data.csv", "text/csv", function(text) {
    testData = d3.csv.parseRows(text, function(d) {
      return d.map(Number);
    });
    kNN();
  })
});

// (2) We then run kNN to classify our test instances
// TODO: Complete this function
function kNN() {
  /* myResults: Array of 2s and 4s, one element for each test instance in testData.
	   Each element at index i corresponds to a prediction for index i in the testData. */
  var myResults = [];
  for (var i = 0; i < testData.length; i++) {
    var testInstance = testData[i];

    /* TODO: Calculate the distance between testInstance and each train instance.
		   Store the top K results (the K train instances with the shortest
		   distances to testInstance) in topResults.
		   Hint: JavaScript's sort() function will be useful for keeping track of the top K results. */
    var topResults = [];

    /* TODO: After getting topResults, Classify the testInstance based on topResults.
		   Our prediction will be the classification that appears most frequently in topResults, and then
		   we will store the prediction (either 2 or 4) in myResults.*/

  }

  // At this point, myResults should contain testData.length predictions. We will now see how accurate we were and print it to console.
  console.log("Final Accuracy: " + printAccuracy(myResults));
}

// Calculates the Euclidean distance between two instances of our data. (https://en.wikipedia.org/wiki/Euclidean_distance#Definition)
// Be careful not to include the SAMPLE CODE NUMBER or the CLASS number when calculating this distance!
// TODO: Complete this function.
function calculateDistance(instance1, instance2) {}

// Computes accuracy of given results array.
function printAccuracy(myResults) {
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
