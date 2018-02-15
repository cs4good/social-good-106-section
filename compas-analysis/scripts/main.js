scipy = Modules.scipy
pandas = Modules.pandas
jsregression = Modules.jsregression
var logistic = new jsregression.LogisticRegression();

Math.seedrandom('CS106S Rocks'); // sets a random seed so the following results are repeatable

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    var oldArray = [].concat(a);
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

// Split data into train and test set
function splitIntoTrainAndTestSet(d, train_perc = .7) {
    shuffle(d);
    idx = Math.floor(train_perc * d.length);
    train = d.slice(0, idx);
    test = d.slice(idx);
    return [train, test];
}

// prep the data for jsregression
function prepareData(d, properties, out, constraints={}) {
    cleanData = [];
    for(var i=0; i < d.length; i++) {
        var row = [];
        var satisfiesConstraints = true;
        for(var constraint in constraints) {
            satisfiesConstraints = satisfiesConstraints && d[i][constraint] === constraints[constraint];
        }
        if(satisfiesConstraints) {
            for(var j=0; j < properties.length; j++) {
                row.push(d[i][properties[j]]);
            }
            row.push(d[i][out]);
            cleanData.push(row);
        }
     }
     return cleanData;
}

// Fit a prediction model
function fitPredictionModel(d) {
    // This method predicts which defendants will commit another crime within two years (two_year_recid column)
    // # 1. YOUR CODE HERE: 
    // # can you come up with a model that does a better job of prediction than just using sex? 
    // # is it fair to use a defendant's sex to predict whether they will commit another crime? Are there features a model should not use? 
    // # try using the other columns in the dataset. 
    console.log('Training model on %d datapoints', d.length);
    var model = logistic.fit(d);
    return model
}

function makePredictions(d) {
    // This gives each defendant a "risk score" which predicts how likely they are to commit a crime within two years. 
    // We add a tiny bit of random noise to each score to prevent two people from having exactly the same risk score. 
    predictions = []
    for(var i = 0; i < d.length; i++){
        predictions.push(logistic.transform(d[i]) + (Math.random() * .00001))
    }
    return predictions
}

function scoreatpercentile(preds, percentage_low_risk) {
    var targetNum = Math.floor(preds.length * percentage_low_risk / 100.0);
    var left = 0.0;
    var right = 1.0;
    var curThresh = (left + right) / 2;

    function countLowRisk(preds, threshold) {
        var count = 0;
        for(var i = 0; i < preds.length; i++) {
            if(preds[i] <= threshold) {
                count = count + 1;
            }
        }
        return count;
    }

    var curNum = countLowRisk(preds, curThresh);
    while(curNum !== targetNum) {
        if(curNum < targetNum) {
            left = curThresh;
        } else {
            right = curThresh;
        }
        curThresh = (left + right) / 2;
        curNum = countLowRisk(preds, curThresh);
    }
    return curThresh;
}

function computeHighRiskThreshold(d, percentage_of_defendants_to_call_high_risk){
    // This method computes the threshold at which we call a defendant high risk, 
    // (eg, if percentage_of_defendants_to_call_high_risk = 20, this would compute the threshold
    // at which 20% of defendants were labeled high risk.) 
    var predictions = makePredictions(d);
    var threshold = scoreatpercentile(predictions, 100 - percentage_of_defendants_to_call_high_risk);
    console.log('The threshold for detaining the top %i%% of defendants is %f', percentage_of_defendants_to_call_high_risk, threshold);
    return threshold;
}

function assessModel(d, threshold){
    // This function assesses the performance of the model. 
    // It already computes accuracy. You need to add code to predict false positive rate. 
    var predictions = makePredictions(d);
    var called_high_risk = [];
    var proportion_called_high_risk = 0;
    var accuracy = 0;
    for(var i = 0; i < predictions.length; i++){
        predictions[i] <= threshold ? called_high_risk.push(0) : called_high_risk.push(1);
        if(called_high_risk[i] > threshold) {
            proportion_called_high_risk++;
        }
        if(called_high_risk[i] == d[i][d[i].length - 1]) { // was the prediction accurate?
            accuracy++;
        }
    }
    
    accuracy /= (1.0 * d.length);
    proportion_called_high_risk /= (1.0 * d.length);
    // YOUR CODE HERE: 
    // 2. Add an expression to compute the false positive rate -- how likely a defendant
    // who will not commit another crime is to be detained. 
    // https://en.wikipedia.org/wiki/False_positive_rate
    false_positive_rate = 0
    console.log('Accuracy with a threshold of %f is %f.', parseFloat(threshold.toFixed(2)), parseFloat(accuracy.toFixed(2)));
    console.log('The proportion called high risk is %f.', parseFloat(proportion_called_high_risk.toFixed(2)));
    // print 'The false positive rate is %2.3f' % false_positive_rate
}

function assessModelByRace(d, threshold){
    // # YOUR CODE HERE: 
    // # 3. Using the method above, see whether there are differences in the performance of your model for black and white defendants.
    // # (see the race column, "Caucasian" and "African-American" values.)
    // # You can select a subset of datapoints using prepareData and passing in a constraints object. 
    // # For example, test_male = prepareData(d, ["sex"], "two_year_recid", {race: "African-American"})
    test_black = prepareData(d, ["sex"], "two_year_recid", {"race": "African-American"});
    console.log(test_black);
    assessModel(test_black, threshold);
    return undefined;
}

// Reading data in
d3.csv("../compas-scores-two-years-violent.csv", function(d){
    data = []
    console.log("%d rows were parsed", d.length)
    // Process data
    d.forEach(function(e){
        c1 = +e["days_b_screening_arrest"] <= 30;
        c2 = +e["days_b_screening_arrest"] >= -30;
        c3 = +e["is_recid"] !== -1;
        c4 = +e["c_charge_degree"] !== 0;
        c5 = e["score_text"] !== 'N/A';
        if(c1 && c2 && c3 && c4 && c5) {
            for (var prop in e) {
                if(!isNaN(e[prop])) {
                    e[prop] = +e[prop]
                } else if(Date.parse(e[prop])) {
                    e[prop] = Date.parse(e[prop]);
                } else if(prop === "sex") {
                    if(e[prop] === "Male") {
                        e[prop] = 1;
                    } else if(e[prop] === "Female") {
                        e[prop] = -1;
                    }
                }
            }
            data.push(e);
        }
    });
    console.log("%d rows remaining after processing", data.length)

    // Split data into train and test
    var split = splitIntoTrainAndTestSet(data);
    var train = prepareData(split[0], ["sex"], "two_year_recid");
    var test = prepareData(split[1], ["sex"], "two_year_recid");
    var testFull = split[1]; // contains full data
    console.log(train.length, test.length)

    // Train model
    var model = fitPredictionModel(train);
    console.log(model);

    // compute the threshold above which we call defendants high risk.
    var threshold = computeHighRiskThreshold(test, 20) // by default, call 20% of defendants high risk
    assessModel(test, threshold);
    assessModelByRace(testFull, threshold);
});