from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index/')
def hello():
    user = {'username': 'DwellerOfHell'}
    return render_template('index.html', user=user)


@app.route('/help/')
def help():
    return render_template('name.html')

@app.route('/<int:id>')
def users(id):
    return render_template('id.html', id = id)

@app.route('/<name>')
def usr_name (name):
    return render_template('usr_name.html', name=name)

@app.route('/table/')
def t1():
    return render_template('table.html')

@app.route('/age/')
def age(age):
    return render_template('age.html')

@app.route('/about/')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)