/* Sentiment Analysis on Refugee Related Tweets
 * Welcome! In this class, we will be looking at classifying the sentiment of tweets with 
 * regards to refugees.
 *
 * RUNNING THE CODE:
 * To run the code, simply open the index.html file in this folder (if on mac, double clicking 
 * on index.html should open it in a browser). Then open up the Chrome Console and check the output :D. 
 * Refresh the page to re-run the code!
 *
 * Edit the code where you see "TODO" to make this work! There are two major tasks for this assignment,
 * and you can find where to make your edits below in the semanticAnalysis() function.
 */

function getScore(c) {
  return (c == "TRUE") ? -1 : 1;
}

var wordMap = {}

function semanticAnalysis() {
  // Object that maps from tweetID to true/false.
  // true = positive = anti-refugee
  // false = negative = not anti-refugee
  // In the end, myGuesses should be of the format:
  // myGuesses = {"tweet_id_1": true, "tweet_id_2": false, "tweet_id_n": true, ...}
  var myGuesses = {};

  /*********** YOUR CODE HERE *********/
  /* 1. Training our "Algorithm"/WordMap
   * First, let's train our wordMap (initialized above the semanticAnalysis function) to assign 
   * scores to each word based on how pro/anti-refugee the word is, giving more positive scores to
   * words that indicate pro-refugee sentiment, and more negative scores to words that indicate 
   * negative-refugee sentiment.
   *
   * For each training tweet, we will iterate through each word in the tweet, and update the
   * word's "score" based on the classification of the tweet.
   *
   * For example, if the training tweet was classified as pro-refugee, then we would add some constant
   * value (say, 1) to that word's score in our wordMap. If the tweet was anti-refugee, then we
   * would subtract that value from the word's score in our wordMap.
   *
   * After going through all training tweets, we should have a score for each word that we've seen.*/
  for (var i = 0; i < trainTweets.length; i++) {
    var tweet = trainTweets[i];
    var words = tweet.tweet.toLowerCase().split(" ");
    var label = getScore(tweet.classification);	// Returns 1 if pro-refugee, -1 if anti-refugee

    // TODO: In-class tutorial: update wordMap based on the words in this tweet + the label
  }

  /* TODO: For the homework assignment - expand this for-loop to create a wordMap that has tf-idf
   * scores. This is left as an open exercise but a general framework is given in class slides.
   */

  /* 2. Classifying our Test Tweets!
   * Now that we have a Word Map of each word to its score of pro/anti-refugee sentiment, let's
   * start classifying tweets in our test data. Each tweet in our test data has two properties:
   *
   * tweet.tweet = string representation of the tweet
   * tweet.tweetID = the ID of the current tweet
   *
   * For each tweet in our testTweet, we want to create a corresponding entry in myGuesses with our
   * guess as to whether or not that tweet is anti-refugee (true) or pro-refugee (false).
   *
   * i.e.: 
   * myGuesses[testTweet1.tweetID] = true    // classifies testTweet1 to be anti-refugee 
   * myGuesses[testTweet2.tweetID] = false    // classifies testTweet2 to be pro-refugee 
   */
  for (var i = 0; i < testTweets.length; i++) {
    var tweet = testTweets[i];

    // TODO: set myGuesses[tweet.tweetID] = true/false based on your prediction for this tweet
  }
  /*********** END CODE HERE *********/

  var accuracy = getAccuracy(myGuesses);

  if (accuracy !== null) {
    console.log("Percent correct: " + accuracy.percentCorrect + "%");
    console.log("False positive rate: " + accuracy.falsePositiveRate + "%");
    console.log("False negative rate: " + accuracy.falseNegativeRate + "%");
  } else {
    console.log("Error in implementation - accuracy = null");
  }
}

semanticAnalysis();
