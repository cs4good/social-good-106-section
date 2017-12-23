// hint: arr[Math.floor(Math.random()*arr.length)] will return a random element from array arr
// Feel free to use your own quotes!

// upliftingQuote should return a random uplifting quote.
function upliftingQuote() {
  // Example quotes:
  // "The first step is you have to say that you can."
  // "Rise above the storm and you will find the sunshine.",
  // BEGIN CODE 
  
  // END CODE
}

// inspiringQuote should return a random inpsiring quote.
function inspiringQuote() {
  // Example quotes: 
  // "If opportunity doesn't knock, build a door."
  // "The best way out is always through."
  // BEGIN CODE 
  
  // END CODE
}

// soothingQuote should return a random soothing quote.
function soothingQuote() {
  // Example quotes: 
  // "For every minute you are angry you lose sixty seconds of happiness."
  // "Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy."
  // BEGIN CODE 
  
  // END CODE
}

// saySomethingNice should return an inspiring quote if the friend is feeling uninspired, an 
// uplifting quote if the friend is feeling sad, and a soothing quote if the friend is feeling
// angry.
// The variable friend will be an object with a name and emotion.
function saySomethingNice(friend) {
  
}

// DO NOT ALTER THE CODE BELOW THIS LINE
friends = [ {name: "Alex", emotion: "sad"}, {name: "Diego", emotion: "angry"}, {name: "Sarah", emotion: "uninspired"}, {name: "Eve", emotion: "sad"} ]
 
for(var friend of friends) {
  console.log(friend.name + " is feeling " + friend.emotion + ".")
  console.log("NiceQuoteBot says: " + saySomethingNice(friend) + "\n")
}
