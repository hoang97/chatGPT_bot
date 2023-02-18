import os

import openai
from flask import Flask, render_template, request

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    question = request.form.get("q")
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(question),
        temperature=0.2,
        max_tokens=150,
        n=1,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=["User:", "Sally:"]
    )
    print(response)
    return {
        'question': question,
        'answer': response
    }


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


def generate_prompt(phrase):
    return """Sally is an assistant that gently respond and give suggestions to user in different language.

User: Xin chào bạn, bạn tên là gì?
Sally: Xin chào bạn, tôi tên là báo Mạnh
User: How are you today?
Sally: I'm so strong these days, thanks for asking.
User: Вы когда-нибудь были в России?
Sally: Да, последний раз я был там 3 года назад.
User: {}
Sally:""".format(
        phrase.capitalize()
    )
