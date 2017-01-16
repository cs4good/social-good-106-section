# cancer-classify.py
# Starter code made by: Stanford CS + Social Good
#
# This is a program to classify breast cancer tumors as malignant or benign using the
# k-nearest-neighbors algorithm. Data can be found for free on the website
# http://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29.
#
# This starter code assumes that the two csv files train_data.csv and test_data.csv
# are in the same directory as this file, cancer-classify.py and parses the csv data
# for you.
#
# Your job is to implement the function kNearestNeighbors.

import math
import csv

# These constants do not need to be modified. However, K can be modified if a different number of
# clusters is desired.
CLASSIFICATION_INDEX = 10
K = 5
BENIGN = 2
MALIGNANT = 4

# This function turns a csv file into a list of lists. Each index of the big list
# holds data for a tumor. A list at an index looks like:
#
# [654244, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2]
# where the features are:
# [radius, texture, perimeter, area, smoothness, compactness, concavity, concave points, 
# symmetry, fractal dimension, classification]
#
# The classification feature tells us whether the tumor is benign or malignant.
# NO NEED TO MODIFY THIS FUNCTION
def populateData(filename):
  lines = []
  with open(filename) as file:
    lines = [map(int, line.rstrip().split(",")) for line in file]
  return lines


# This function performs k-nearest-neighbors on the test data set's members given a training data set.
#
# TODO: The majority of your functionality will go here. Delete line 61 (raise ValueError)
# once you start coding.
def kNearestNeighbors(trainData, testData):
  # myResults is a list of 2s and 4s, one element for each test instance.
  # You will be filling this array in this function. 
  myResults = []

  # For each test instance, you can classify it as either benign or malignant by
  # doing the following:
  #
  # - Calculate each distance from the current test instance to all the training instances,
  # which is len(trainData) number of distances to calculate.
  # - Keep track of the smallest K distances, or the K closest points to the test instance.
  # - If majority of the K closest points are benign, then classify the test instance as benign.
  # Otherwise, classify the test instance as malignant.
  # - Add your classification to myResults.
  for i in range(0, len(testData)):    
    # BEGIN CODE HERE (our solution is 31 lines of code, but don't feel constrained by this)
    raise ValueError("kNearestNeighbors not implemented.")
    # END CODE HERE

  return myResults


# This function returns the Euclidean distance between two data instances.
# It finds the sum of the squares of distances between
# each legitimate data point in instance1 and instance2.
def calculateDistance(instance1, instance2):
  distance = 0
  for i in range(1, CLASSIFICATION_INDEX):
    distance += (instance1[i] - instance2[i]) ** 2
  return math.sqrt(distance)

# Computes accuracy of given results list and prints results.
# NO NEED TO MODIFY THIS FUNCTION
def printAccuracy(myResults, testData):
  if len(myResults) != len(testData):
    assert("Please provide exactly one classification for each test instance.")
  
  totalTestInstances = len(testData)
  correctClassifications = 0

  for i in range(0, len(myResults)):
    currResult = myResults[i]
    correctResult = testData[i][CLASSIFICATION_INDEX]
    if currResult == correctResult:
      correctClassifications += 1

  percentAccuracy = float(correctClassifications * 100 / totalTestInstances)
  print("Percent Accuracy: " + str(percentAccuracy))

# NO NEED TO MODIFY THE MAIN FUNCTION
def main():
  trainData = populateData("train_data.csv")
  testData = populateData("test_data.csv")
  myResults = kNearestNeighbors(trainData, testData)
  printAccuracy(myResults, testData)

if __name__ == "__main__":
  main()