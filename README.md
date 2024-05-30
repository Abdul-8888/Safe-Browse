# Safe Browse (Chrome Extension)
### Dataset
The data for this project has been collected from
Kaggle: https://www.kaggle.com/datasets/mrmorj/hate-speech-and-offensive-language-dataset and figshare: https://figshare.com/articles/dataset/Labelled_Hate_Speech_Detection_Dataset_/19686954.

### How to Run
1. Download the dataset from the above mentioned websites.
2. Put the data along with data_combination file in a folder and run the file.
3. Now bring in the training file in the folder and run it.
4. It will generate model.weights.h5, model_config.json, tokenizer.pkl and training_history.pkl
5. Now bring these files inside a folder having app, background, content, icon, manifest and popup files.
6. Add this extension to chrome manually.
7. Now run app file using flask.
8. Now your exntension is running.
