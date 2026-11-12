from fastapi import FastAPI

app = FastAPI(title="BookReader API")

books = [ 
	{
		"id":1,
		"title": "The Hobbit",
		"author": "J. R. R. Tolkien",
	},
	{
		"id":2,
		"title": "1984",
		"author": "George Orwell",
	},
]

@app.get("/")
def home():
	return {"message": "BookReader API is running"}

@app.get("/books")
def get_books():
	return books