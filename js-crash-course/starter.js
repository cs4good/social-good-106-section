function run() {
  //Call whichever functions you want to run here.
}

function number() {
  //Floating Point
  console.log((0.1 + 0.1) == 0.2);
  console.log((0.1 + 0.2) == 0.3);
  //Nan & Infinity
  console.log(1/0);
  console.log(Math.sqrt(-1));
  /* TODO:
   * Compute the square root of your birth year.
   */
}

function string() {
  var studentQuote = 'I love CS 106S!'
  console.log(studentQuote.length);
  console.log(studentQuote.indexOf(' '));
  console.log('CS' + 'SG');
  var abcd = "abcd";
  /* TODO:
   * Use "charAt()" to find what the third letter of var abcd is.
   * Create a version of studentQuote that is in ALL CAPS.
   * Helpful string methods include: charAt(), search(), replace(), toUpperCase(), substr(), etc.
   */
}

function boolean() {
  var cs = true;
  var socialGood = true;
  console.log(cs && socialGood);
  console.log(Math.sqrt(-1) == cs);
  console.log(Boolean(1/0) == cs);
}

function objects() {
  var berkeley = {intelligence: 0, tears: Infinity};
  var stanford = {intelligence: 100, smiles: Infinity};
  //Referenced either as a structure or a hash table with string keys.
  console.log(stanford.smiles);
  console.log(berkeley["intelligence"]);
  stanford.students = 40000;
  console.log(stanford);
  delete stanford.students;
  console.log(stanford)
  console.log(Object.keys(stanford));
  /* TODO:
   * Create an object representing your music playlist, mapping song name to artist.
   * Add "Everytime We Touch" by Cascada to your playlist.
   * Add "Love on Top" by Beyonce.
   * Add "Look What You Made Me Do" by Taylor Swift.
   * Delete "Look What You Made Me Do" by Taylor Swift.
   * Print a list of just song names.
   */
}

function arrays() {
  var colors = ['red', 'blue', 'yellow'];
  console.log(typeof colors);
  console.log(colors[2]);
  colors[10] = true;
  console.log(colors);
  console.log(colors.length);
  /* TODO:
   * Create an array of your classes.
   * Write code to simulate adding a class to your array and dropping a class.
   */
}


function conditionals(name, age) {
  /* TODO:
   * Write an if statement to print out the given name parameter if it is your name.
   * Loop over the letters in your name and print them out if they are vowels.
   * While the given age is less than 100, print it out (hint: use console.log()) and increment it.
   */
}

// DO NOT ALTER THE CODE BELOW THIS LINE
run();
