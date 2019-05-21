// File: bioinformatics.js
// Description: Javascript file controlling functionality of GWAS Bioinformatics lesson for
// CS106S Workshop.
// Last Updated: Spring '19

/**************		Global Variables		****************/
// In the html file, we've loaded in the global variables:
// matrix = a 102 x 12533 matrix of people by expression scores for each gene
// genes = a 12533 list of the name of the gene in the matrix
// labels = a 102 list of whether the patient has prostate cancer (1) or not (0)

/*	Function: initialize()
 *	Called upon website loading. This creates everything that the user sees.
 */
function initialize() {

}

function write(str) {
    var output_box = document.getElementById("output_box")
    output_box.innerHTML = str
}

/*	Function: debug()
 *	Called when user clicks on "Debug" button. Does whatever you want it to do.
 *	
 */
function debug() {
    console.log("You just pressed the debug button!")
    write("Hello World!")
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) { return r[c]; });
    });
}

/*	Function: calcAssoc()
 *	Called when user clicks the "Calculate Associations" button. Trains a linear regression model on the data.
 */
function calcAssoc() {

    console.log("Let's get started!")

    /*
     * (1) Understand what our data looks like! Take a peek into our data files, or console.log the variables "matrix", "genes", and "labels"!
     */


    /*
     * (2) Familiarize yourself with multiple linear regression, and the jsregression package (https://www.npmjs.com/package/js-regression)
     */ 



    /*
     * (3) Data preprocessing! Hint: the jsregression interface requires the "labels" of the data - whether or not they have the illness, to be the last column of the data matrix
     * You might also want to normalize across the columns of the data, to assist the training. We've defined a "transpose" function above, in case you need it.
     * Normalize across columns of data
     */
    console.log("Beginning data preprocessing!")



    /*
     * (4) Do the linear regression part! You can instantiate a LinearRegression object with default parameters like so: 
     * var regression = new jsregression.LinearRegression()
     * 
     * You can define custom training parameters like so
     * var regression = new jsregression.LinearRegression({
     *   alpha: ???,   // Learning rate, should be on the scale of 1e-3 t0 1e-5
     *   iterations: ???,  // Number of iterations to train; start out small and then train for longer once you see it's working
     *   lambda: 0.0,  // Coefficient initialization
     *   trace: true, // Whether to console.log the training as it occurs
     * });
     * 
     * Finally, you can train your model on the data like so
     * var model = regression.fit(data)
     * 
     * and print the results like this
     * console.log(model)
     * 
     * Feel free to play around with all these hyperparameters, or even experiment with other models.
     */
    console.log("starting regression")

    /*
     * (5) Examine results! Take a look at your trained model, and find out if you can see if any given gene might be a good candidate for further examination.
     */

    console.log(`Most impactful gene was BLANK with a coefficient of BLANK`)
}