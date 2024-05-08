from keras.models import model_from_json
from keras.preprocessing.sequence import pad_sequences
import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def predict():
    input_data = request.json.get('text')
    model, tokenizer = load()
    prediction = test(model, tokenizer, input_data)
    return jsonify({'prediction': prediction})

def load():
    # Load the model configuration
    with open('model_config.json', 'r') as json_file:
        loaded_model_json = json_file.read()
    model = model_from_json(loaded_model_json)

    # Load the model weights
    model.load_weights('model.weights.h5')

    # Load the tokenizer
    with open('tokenizer.pkl', 'rb') as f:
        tokenizer = pickle.load(f)

    return model, tokenizer

def test(model, tokenizer, input):

    # input_sentence = "Blacks are all idiots"
    # input_sentence = "Alhamd'li'Allah I am fine"
    X_input = tokenizer.texts_to_sequences([input])
    X_input_padded = pad_sequences(X_input, maxlen=50)  # Assuming max_sequence_length is 50

    prediction = model.predict(X_input_padded)
    if prediction > 0.5:
        return 1
    else:
        return 0
