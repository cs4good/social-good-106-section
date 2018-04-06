var mapping = {
  "a":0, "b":1, "c":2,"d":3, "e":4, "f":5,"g":6, "h":7, "i":8,
  "j":9, "k":10, "l":11,"m":12, "n":13, "o":14,"p":15, "q":16, 
  "r":17,"s":18, "t":19, "u":20,"v":21, "w":22, "x":23, "y":24, "z":25
}

/* TODO: Write some tests here!
 */

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
 // TODO: Complete this function.
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
 // TODO: Complete this function.
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
 // TODO: Complete this function.
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
 // TODO: Complete this function.
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
 // TODO: Complete this function.
}
