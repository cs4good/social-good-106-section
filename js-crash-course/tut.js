///////////////////////////////////
// 1. Numbers, Strings and Operators

// Some basic arithmetic works as you'd expect.
1 + 1; // => 2
0.1 + 0.2; // => 0.30000000000000004
8 - 1; // => 7
10 * 2; // => 20
5 / 2; // => 2.5

// Negation uses the ! symbol
!true; // = false
!false; // = true

// Equalities
1 === 1; // => true
2 === 1; // => false
1 !== 1; // => false
2 !== 1; // => true

// Strings are concatenated with +
"Hello " + "world!"; // => "Hello world!"

// You can access characters in a string with `charAt`
"This is a string".charAt(0);  // => 'T'

// Or just using [] syntax
"This is a string"[5];  // => 'i'

// ...or use `substring` to get larger pieces.
"Hello world".substring(0, 5); // => "Hello"

// `length` is a property, so don't use ().
"Hello".length; // => 5

///////////////////////////////////
// 2. Variables

// Variables declared without being assigned to are set to undefined.
var someThirdVar; // => undefined

// Variables can be updated in place
var x = 5;
x += 1; // x => 6
x *= 4; // x => 24

///////////////////////////////////
// 3. Arrays and Objects

// Arrays are ordered lists of values, of any type.

var myArray = ["Hello", 45, true];
myArray[1]; // => 45

// Arrays are mutable and of variable length.
myArray.push("World");
myArray.length; // => 4
myArray[3] = "Hello";

// Join all elements of an array with semicolon
var myArray0 = [32, false, "js", 12, 56,90];
myArray0.join(";") // => "32;false;js;12;56;90"

// Get subarray of elements from index 1 (include) to 4 (exclude)
myArray0.slice(1,4); // => [false,"js",12]

// JavaScript's objects are equivalent to "dictionaries" or "maps" in other
// languages: an unordered collection of key-value pairs.
var myObj = {key1: "Hello", key2: "World"};

// Keys are strings, but quotes aren't required if they're a valid
// JavaScript identifier. Values can be any type.
var myObj = {myKey: "myValue", "my other key": 4};

// Object attributes can also be accessed using the subscript syntax,
myObj["my other key"]; // => 4

// ... or using the dot syntax, provided the key is a valid identifier.
myObj.myKey; // => "myValue"

// Objects are mutable; values can be changed and new keys added.
myObj.myThirdKey = true;

// If you try to access a value that's not yet set, you'll get undefined.
myObj.myFourthKey; // => undefined

///////////////////////////////////
// 4. Logic and Control Structures

// The `if` structure works as you'd expect.
var count = 1;
if (count == 3) {
  // evaluated if count is 3
} else if (count == 4) {
  // evaluated if count is 4
} else {
  // evaluated if it's not either 3 or 4
}

// As does `while`.
while (true) {
  // An infinite loop!
}

// The `for` loop is the same as C and Java:
// initialization; continue condition; iteration.
for (var i = 0; i < 5; i++){
  // will run 5 times
}

// The for/in statement allows iteration over properties of an array
for (var x in myArray) {
  console.log(x)
}

// or of an Object!
var description = "";
var person = {
  fname: "Paul", 
  lname: "Ken", 
  age: 18
};
for (var x in person){
  description += person[x] + " ";
} // description => 'Paul Ken 18 '

// && is logical and, || is logical or
if (house.size == "big" && house.colour == "blue"){
  // Do stuff
}
if (colour == "red" || colour == "blue"){
  // Do stuff
}

// && and || "short circuit", which is useful for setting default values.
var name = otherName || "default";

///////////////////////////////////
// 5. Functions

// JavaScript functions are declared with the `function` keyword.
function myFunction(thing) {
  return thing.toUpperCase();
}
myFunction("foo"); // => "FOO"

// You can isolate complex logic with functions!
function product(array) {
  var sum = 0;
  for (var e in array) {
    sum *= array;
  }
  return sum;
}

function dotProduct(v, w) {
  var dot = 0;
  for (var i = 0; i < v.length; i++) {
    dot += v[i] * w[i];
  }
  return dot;
}

// Recursion! The topic of study for the latter half of 106B
function fibonacci(n) {
  if (n < 0) {
    throw "Only works for positive numbers!"
  } else if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * fibonacci(n - 1);
  }
}
