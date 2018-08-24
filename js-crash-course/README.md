# Javascript Crash Course

## Steps

1. Make sure you have Chrome or Safari installed
2. Download the starter code
3. Type 'cmd-option-j' to open the Javascript Console
4. Go through `tut.js`, mirroring in console
5. Open up `index.html` from the starter code
6. Continue to Cryptography!

# Basic Cryptography

## Intro
This workshop will introduce you to the basics of cryptographic ciphers, which are methods to mask sensitive information, such as passwords, personally identifiable information (PII), and more.

## Your Task
Today, you will be writing a Caesar cipher and (optionally) a Vigenere cipher. Both ciphers work by by shifting each character in the given string (the plaintext).

## Caesar Cipher
In the Caesar cipher, every character is shifted the same number of characters. For example, say our shift length is 1. That would mean A shifts to B, B shifts to C, C shifts to D, ..., Y shifts to Z, Z shifts to A. Notice that the letters at the end of the alphabet wrap around and shift to the beginning of the alphabet.

For example, encrypting "CSSG" with a Caesar cipher with length 6 gives us the following:
c -> i
s -> y
s -> y
g -> m

We can see that this matches up with the indices of these letters (look in assignment.js for these indices!):
c -> 2, i -> 8
s -> 18, y -> 24
s -> 18, y -> 24
g -> 6, m -> 12

You can make the following assumptions:
    All of the text we work with will be of length non-zero.
    All given alphabetic characters will be lowercase.
    We do not apply the cipher to non-alphabetic characters. If you encounter one, do not modify it.

## Viginere Cipher (Extension)
The Viginere cipher is similar to the Caesar, but does not use a fixed length to shift by. Instead, we use a given "keyword", such as "cs". First, we repeat the keyword over the original until both are the same length. If we use keyword "cs" on the word "socialgood", this is what that would look like:

Original: social
Keyword-Repeated: cscscs

Here, you see that we have repeated cs to form a string that's the same length as the original. Now, for each letter in the keyword, we find its associated shift length, which is provided in the object mapping. Here, the shift length for "c" is 2 and "s" is 18. Therefore, we will shift every other letter by 2 positions and all other letters by 18.

Let's walk through this letter by letter.
s will shift to u (a shift of 2)
o will shift to g (a shift of 18)
c will shift to e (a shift of 2)
i will shift to a (a shift of 18)
a will shift to c (a shift of 2)
l will shift to d (a shift of 18)

Therefore, our final encryption is "ugeacd". A bit harder to crack! You may make the same assumptions here.

## Followup
Let course staff know if you have any questions! If you have additional extensions, let us know in your email submission!

## Credit
Thank you to Stanford Python for providing the inspiration for this assignment!

