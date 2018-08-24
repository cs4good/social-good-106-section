
/* ******************************
 * CS 106S: Cryptography Solution
 * By Ashi Agrawal
 * ******************************/

console.log("Hello World! I'm printing from `assignment-solution.js`");

/*
 * References
 * > mapping: given a letter, what position of the alphabet is it
 * > alphabet: an array of all letters in an alphabet
 */

var mapping = {
  "a": 0,  "b": 1,  "c": 2,  "d": 3,  "e": 4,
  "f": 5,  "g": 6,  "h": 7,  "i": 8,  "j": 9,
  "k": 10, "l": 11, "m": 12, "n": 13, "o": 14,
  "p": 15, "q": 16, "r": 17, "s": 18, "t": 19,
  "u": 20, "v": 21, "w": 22, "x": 23, "y": 24,
  "z": 25
}

// alphabet => ["a", "b", "c", ..., "z"]
// Q: what is alphabet[14]? => "o"

var alphabet = Object.keys(mapping);


/* **********************
 * ASSIGNMENT BEGINS HERE
 * **********************/

var test = "alphabet";
var encrypted = encryptCaesar(test);
var result = checkCaesar(test, encrypted);

console.log(result);

/*
 * Shifts the given letter by a given length.
 * ----
 * Params:
 * > original - letter you'd like to shift
 * > shift - length to transpose letters by
 *
 * Returns:
 * > char - shifted letter
 */

function shiftLetter(original, shift) {
  if (!original.match(/[a-z]/i)) return original;
  var newValue = (mapping[original] + shift) % 26;
  return alphabet[newValue];
}


/*
 * Encrypts the given string using the Caesar cipher and the given length.
 * ----
 * Params:
 * > original - string you would like to encrypt
 * > shift - given transposition length
 *
 * Returns:
 * > string - the encrypted version of the given string using the given length
 */

function encryptCaesar(original, shift) {
  original = original.toLowerCase();

  var encrypted = "";
  for (var i = 0; i < original.length; i++) {
    var char = original[i];
    var encryptedLetter = shiftLetter(char, shift);
    encrypted += encryptedLetter;
  }
  return encrypted;
}


/*
 * Determines whether the first string is the encrypted version of the second with a given encryption shift.
 * ----
 * Params:
 * > encrypted - given encryption
 * > shift - given transposition length
 * > guess - your guess for the unencrypted string
 *
 * Returns:
 * > boolean - if encrypted is a valid encryption of guess with given length
 */

function checkCaesarWithShift(encrypted, shift, guess) {
  encrypted = encrypted.toLowerCase();
  guess = encrypted.toLowerCase();

  var msgLen = encrypted.length;
  if (msgLen != guess.length) return false;
  if (msgLen == 0) return true;

  for (var i = 0; i < msgLen; i++) {
    var charGuess = guess[i];
    var encryptedLetter = shiftLetter(charGuess, shift);
    if (encryptedLetter != encrypted[i]) return false;
  }
  return true;
}


/*
 * Determines whether the first string is the encrypted version of the second.
 * Try to use checkCaesarWithShift!
 * ----
 * Params:
 * > encrypted - given encryption
 * > guess - your guess for the unencrypted string
 *
 * Returns:
 * > boolean - if encrypted is a valid encryption of guess
 */

function checkCaesar(encrypted, guess) {
  encrypted = encrypted.toLowerCase();
  guess = encrypted.toLowerCase();

  if (encrypted.length != guess.length) return false;
  if (encrypted.length == 0) return true;

  var shift = mapping[encrypted[0]] - mapping[guess[0]];
  return checkCaesarWithShift(encrypted, shift, guess);
}


/*
 * *** EXTENSION ***
 * ----
 * Encrypts the given string using the Vigenere cipher and the given keyword.
 * ----
 * Params:
 * > original - string you would like to encrypt
 * > length - given keyword
 *
 * Returns:
 * > string - the encrypted version of the given string using the given keyword
 */

function encryptVigenere(original, keyword) {

}
