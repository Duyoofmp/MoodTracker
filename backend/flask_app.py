
from flask import Flask,request
import eng_spacysentiment

nlp = eng_spacysentiment.load()

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/test',methods=['GET', 'POST'])
def main():
    if request.method == 'POST':
        text = request.form['input']
        doc = nlp(text)

        return doc.cats
    return 'provide query'


