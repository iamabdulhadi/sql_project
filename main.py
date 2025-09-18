from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def style():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/search')
def search():
    query = request.args.get('q')
    # In a real application, you would use the query to perform a web crawl.
    # For now, we'll just return some mock data.
    mock_results = [
        { "title": "Result 1 from server", "url": "#", "snippet": "This is the first mock result from the server." },
        { "title": "Result 2 from server", "url": "#", "snippet": "This is the second mock result from the server." },
        { "title": "Result 3 from server", "url": "#", "snippet": "This is the third mock result from the server." }
    ]
    return jsonify(mock_results)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
