# TranslatAR
### AR.js and Callbacks

This class focuses on the usage of AR as a new UI interface for interactive behavior. Namely, we focus on using AR markers combined with QR codes as possible sources for tourist information. An example would be a tourist arriving at a new city, scanning a QR code with information aobut a monument, automatically transalted to their native tounge.

The code is divided into two central parts:
1. `camera.html`: application that can scan ARcode's and display the encoded information using computer graphics (3.js).
2. `arcode.html`: generates an ARcode (Hiro marker and QR code mix) that can be scanned.

This class also takes advantage to introduce the concept of a callback function, asynchronous programming, and DOM, as these concepts are central to JS programming. To teach this, you can use `tutorial.js` which goes through the process of selecting an HTML element, using event listeners, which receives callback functions.

### To Do's:
1. Tutorial: make the button alternate colors
2. ARCode: use callbacks to know when you're done
3. Camera: use A-frame to make cool signs
