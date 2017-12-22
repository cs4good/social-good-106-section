# CareerVillage.org collective intelligence workshop
# Stanford University CS + Social Good 
# Feb 17th, 2016
# Presenter: Jared Chung, Founder at CareerVillage.org
# Contact: jared@careervillage.org

########################################################################################
# Download the data (You don't need Python for this part)                              #
########################################################################################
# To begin, you will need to get the CSV files from this Dropbox folder...
# https://www.dropbox.com/sh/7jtmcqyqmj6ripx/AABOGvfSmNBuNFWXe81IC_mNa?dl=0
# Copy these three CSV files into the folder where you have this .py file


########################################################################################
# Let's get data out of the CSVs and into some lists we can play with in Python        #
########################################################################################

import datetime
import csv
import os
from ast import literal_eval

# There are three CSV files. We're going to get all four and put them into four lists. 
raw_question_data = csv.DictReader(open('cv_questions.csv','rU'))
question_list = []
for row in raw_question_data:
    question_list.append(row)

raw_answer_data = csv.DictReader(open('cv_answers.csv','rU'))
answer_list = []
for row in raw_answer_data:
    answer_list.append(row)

raw_user_data = csv.DictReader(open('cv_users.csv','rU'))
user_list = []
for row in raw_user_data:
    user_list.append(row)

# For convenience, we'll create a list of the actual matches. question_id first, 
# id of the person who answered the question second.
correct_list = []
for answer in answer_list:
    match = (answer['id_of_question_being_answered'],answer['author.id'])
    if match not in correct_list: # Sometimes people answer questions twice
        correct_list.append(match)


########################################################################################
# Here's an example of how to access the data in these lists                           #
########################################################################################
question_list[0]['title'] # Title of the first question
question_list[0]['tagname_list'].split(' ') # List of tags from the first question
answer_list[0]['author.id'] # User ID of the person who wrote the first answer in the list
literal_eval(user_list[3]['topics_followed']) # List of topics followed by 4th user


########################################################################################
# Your awesome matching algorithms go here...                                          #
########################################################################################

predicted_list = []








# You want your predicted_list to have the following format:
# predicted_list = [
#     ('7412','3611'),
#     ('10556','6778'),
#     ('1081','59')
#     ]
# Where the first number in each pair is the question_id and the second number is 
# the author.id

########################################################################################
# Now we calculate our F-Measure (aka F1 score https://en.wikipedia.org/wiki/F1_score) #
########################################################################################

# We gave you a list called correct_list which has every real question-to-user match. 
# Let's assume you have a list of retrieved matches called predicted_list (these are 
# your predictions for which questions should be sent to which users). 
total_matched = len(correct_list)
total_predicted = len(predicted_list)
correctly_predicted = len(set(correct_list).intersection(predicted_list))

# Calculate (and print) the f-measure
precision = float(correctly_predicted) / float(total_predicted) # Calculate precision
recall = float(correctly_predicted) / float(total_matched) # Calculate recall
if correctly_predicted > 0:
    f1 = 2 * ( precision * recall) / float(precision + recall)
else:
    f1 = 0.0

print "precision: %s" % precision 
print "recall: %s" % recall
print "f1: %s" % f1