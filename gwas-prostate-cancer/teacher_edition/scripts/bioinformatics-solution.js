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

/* Function: norm(array)
 * Returns the array scaled between 0-1
 * 
 */
function norm(arr) {
    //Find mean
    var total = 0
    var min = 1000000
    var max = -1000000
    for (var i = 0; i < arr.length; i++) {
        total += arr[i]
        if (arr[i] < min) {
            min = arr[i]
        }
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    var mean = total / arr.length

    //Find std 
    var variance = 0
    for (var i = 0; i < arr.length; i++) {
        variance += Math.pow(arr[i] - mean, 2)
    }
    var std = Math.sqrt(variance / arr.length)
    //return arr.map(x => (x - mean) / variance)
    return arr.map(x => (x-min)/(max - min))
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
    // Normalize across columns of data
    matrix = transpose(matrix)
    matrix = matrix.map(norm)
    matrix = transpose(matrix)

    //Augment matrix with labels in the last column
    var aug_data = Array.from(matrix)
    for (var i = 0; i < aug_data.length; i++) {
        aug_data[i].push(labels[i])
    }

    console.log("starting regression")
    write("Starting regression!")

    //Do the linear regression
    var regression = new jsregression.LinearRegression({
        alpha: 0.0002,
        iterations: 20,
        lambda: 0.0,
        trace: true,
    });
    var model = regression.fit(aug_data)
    console.log(model)
    write(model)

    coeff = model.theta

    //Find max coefficient and report gene
    var gene_idx = -1
    var max = -1000000
    for (var i = 0; i < coeff.length; i++) {
        if (coeff[i] > max) {
            max = coeff[i]
            gene_idx = i
        }
    }

    console.log(`Most impactful gene was ${genes[gene_idx]} with a coefficient of ${max}`)
    write(`Most impactful gene was ${genes[gene_idx]} with a coefficient of ${max}`)
}