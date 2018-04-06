var mapping = {
  "a":0, "b":1, "c":2,"d":3, "e":4, "f":5,"g":6, "h":7, "i":8,
  "j":9, "k":10, "l":11,"m":12, "n":13, "o":14,"p":15, "q":16, 
  "r":17,"s":18, "t":19, "u":20,"v":21, "w":22, "x":23, "y":24, "z":25
}

/*
 * Encrypts the given string using the Caesar cipher and the given length.
 * ----
 * Returns:
 * string - the encrypted version of the given string using the given length
 * Params:
 * original - string you would like to encrypt
 * length - given transposition length
 *
 */
function encryptCaesar(original, length) {
  var encrypted = "";
  original = original.toLowerCase();
  for (var i = 0; i < original.length; i++) {
    var char = original.charAt(i);
    var encryptedLetter = shiftLetter(char, length);
    encrypted += encryptedLetter;
  }
  return encrypted;
}

/*
 * Determines whether the first string is the encrypted version of the second with a given encryption length.
 * ----
 * Returns:
 * boolean - if encrypted is a valid encryption of guess with given length
 * Params:
 * encrypted - given encryption
 * length - given transposition length
 * guess - your guess for the unencrypted string
 *
 */
function checkCaesarWithLength(encrypted, length, guess) {
  encrypted = encrypted.toLowerCase();
  guess = encrypted.toLowerCase();
  var msgLen = encrypted.length;
  if (msgLen != guess.length) return false;
  if (msgLen == 0) return true;
  for (var i = 0; i < msgLen; i++) {
    var charGuess = guess.charAt(i);
    var encryptedLetter = shiftLetter(charGuess, length);
    if (encryptedLetter != encrypted.charAt(i)) return false;
  }
  return true;
}

/*
 * Determines whether the first string is the encrypted version of the second.
 * ----
 * Returns:
 * boolean - if encrypted is a valid encryption of guess
 * Params:
 * encrypted - given encryption
 * guess - your guess for the unencrypted string
 *
 */
function checkCaesar(encrypted, guess) {
  encrypted = encrypted.toLowerCase();
  guess = encrypted.toLowerCase();
  if (encrypted.length != guess.length) return false;
  if (encrypted.length == 0) return true;
  var charEncrypted = encrypted.charCodeAt(0);
  var charGuess = guess.charCodeAt(0);
  var length = charEncrypted - charGuess;
  return checkCaesarWithLength(encrypted, length, guess);

}

/*
 * Shifts the given letter by a given length.
 * ----
 * Returns:
 * char - shifted letter
 * Params:
 * original - letter you'd like to shift
 * length - length to transpose letters by
 *
 */
function shiftLetter(original, length) {
  if (!original.match(/[a-z]/i)) return original;
  var letters = Object.keys(mapping);
  var newValue = (mapping[original] + length) % 26;
  return letters[newValue];
}

/*
 * *** EXTENSION ***
 * ----
 * Encrypts the given string using the Vigenere cipher and the given keyword.
 * ----
 * Returns:
 * string - the encrypted version of the given string using the given keyword
 * Params:
 * original - string you would like to encrypt
 * length - given keyword
 *
 */
function encryptVigenere(original, keyword) {

}
