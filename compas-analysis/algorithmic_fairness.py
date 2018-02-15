import pandas as pd
import statsmodels.api as sm
import random
from scipy.stats import scoreatpercentile
from scipy import stats
stats.chisqprob = lambda chisq, df: stats.chi2.sf(chisq, df)
from collections import Counter

"""
This project investigates what it means for a criminal sentencing algorithm to be fair. 
Much credit is due to ProPublica's investigation: https://github.com/propublica/compas-analysis
Original article here: https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing
You do not need to change any code except at the three points marked "YOUR CODE HERE". 
See the main method (at bottom) for the steps in the analysis. 
"""

def readInData(filename):
    # This method reads in the data and applies the same filters the journalists used. 
    # You do not need to change it. 
    d = pd.read_csv(filename)
    print 'successfully parsed data with %i rows' % len(d)
    idxs = d['days_b_screening_arrest'] <= 30
    idxs = idxs & (d['days_b_screening_arrest'] >= -30)
    idxs = idxs & (d['is_recid'] != -1)
    idxs = idxs & (d['c_charge_degree'] != 0)
    idxs = idxs & (d['score_text'] != 'N/A')
    print idxs.sum(), 'rows remaining after filtering'
    print 'The columns you have to play with are', list(d.columns)
    return d

def splitIntoTrainAndTestSet(d, train_perc = .7):
    # This splits the data into a train and test set in order to properly assess the model. 
    all_idxs = range(len(d))
    random.shuffle(all_idxs)
    train_cutoff = int(len(all_idxs)*train_perc)
    train_idxs = all_idxs[:train_cutoff]
    test_idxs = all_idxs[train_cutoff:]
    return d.iloc[train_idxs], d.iloc[test_idxs]

def fitPredictionModel(d):
    # This method predicts which defendants will commit another crime within two years (two_year_recid column)
    # 1. YOUR CODE HERE: 
    # can you come up with a model that does a better job of prediction than just using sex? 
    # is it fair to use a defendant's sex to predict whether they will commit another crime? Are there features a model should not use? 
    # try using the other columns in the dataset. 
    print 'Training model on %i datapoints' % len(d)
    model = sm.Logit.from_formula('two_year_recid ~ C(sex)', data = d).fit()
    print model.summary()
    return model

def makePredictions(model, d):
    # This gives each defendant a "risk score" which predicts how likely they are to commit a crime within two years. 
    # We add a tiny bit of random noise to each score to prevent two people from having exactly the same risk score. 
    predictions = model.predict(d).values
    for i in range(len(predictions)):
        predictions[i] = predictions[i] + random.random() * 1e-5
    return predictions

def computeHighRiskThreshold(model, d, percentage_of_defendants_to_call_high_risk):
    # This method computes the threshold at which we call a defendant high risk, 
    # (eg, if percentage_of_defendants_to_call_high_risk = 20, this would compute the threshold
    # at which 20% of defendants were labeled high risk.) 
    predictions = makePredictions(model, d)
    threshold = scoreatpercentile(predictions, 100 - percentage_of_defendants_to_call_high_risk)
    print 'The threshold for detaining the top %i%% of defendants is %2.3f' % (percentage_of_defendants_to_call_high_risk, threshold)
    return threshold


def assessModel(model, d, threshold):
    # This function assesses the performance of the model. 
    # It already computes accuracy. You need to add code to predict false positive rate. 
    predictions = makePredictions(model, d)
    called_high_risk = predictions >= threshold
    proportion_called_high_risk = (called_high_risk).mean()
    accuracy = (called_high_risk == d['two_year_recid']).mean()
    # YOUR CODE HERE: 
    # 2. Add an expression to compute the false positive rate -- how likely a defendant
    # who will not commit another crime is to be detained. 
    # https://en.wikipedia.org/wiki/False_positive_rate
    false_positive_rate = 0
    print 'Accuracy with a threshold of %2.3f is %2.3f' % (threshold, accuracy)
    print 'The proportion called high risk is %2.3f' % (proportion_called_high_risk)
    print 'The false positive rate is %2.3f' % false_positive_rate

def assessModelByRace(model, d, threshold): 
    # YOUR CODE HERE: 
    # 3. Using the method above, see whether there are differences in the performance of your model for black and white defendants.
    # (see the race column, "Caucasian" and "African-American" values.)
    # You can select a subset of datapoints using "loc" and passing in a boolean vector. 
    # For example, male_defendants = d.loc[d['sex'] == 'Male']
    pass

if __name__ == '__main__':
    random.seed(42) # set a random seed so you get the same results every time. 
    d = readInData('compas-scores-two-years-violent.csv') # read in data the same way the journalists did. 
    train_data, test_data = splitIntoTrainAndTestSet(d)  # split into train / test set. 
    prediction_model = fitPredictionModel(train_data) # predict who will commit a violent crime within two years. 
    threshold = computeHighRiskThreshold(prediction_model, test_data, percentage_of_defendants_to_call_high_risk = 20) # compute the threshold above which we call defendants high risk.
    assessModel(prediction_model, test_data, threshold) # assess model performance
    assessModelByRace(prediction_model, test_data, threshold) # assess model performance broken down by race. 
