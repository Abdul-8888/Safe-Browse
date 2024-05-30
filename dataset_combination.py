import pandas as pd

# Load labeled data
labeled_data = pd.read_csv('labeled_data.csv')

# Function to classify tweets
def classify_tweet(row):
    hate_offensive_sum = row['hate_speech'] + row['offensive_language']
    threshold = row['count'] * 0.5
    if hate_offensive_sum >= threshold:
        return 1  # Hateful
    else:
        return 0  # Positive

# Apply classification
labeled_data['Hateful'] = labeled_data.apply(classify_tweet, axis=1)

# Append classified tweets to HateSpeechDetection.csv
classified_tweets = labeled_data[['tweet', 'Hateful']]
classified_tweets.to_csv('HateSpeechDetection.csv', mode='a', index=False, header=False)