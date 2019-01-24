import data_in
from datetime import date, datetime
import mysql.connector

# FIELDS: [id, headline, body, blurb, author, (main_image), (image_caption), date_posted]
story_data = ("Test Story", "Ethan M", "placeholder story", "This is a story meant to act as a placeholder. Please do not seek any meaning here as you will only find heartbreak and disappointment.", datetime.now())

# connect to database (local for testing)
db = mysql.connector.connect(host="localhost", user="root", password="daily_kansan_news", database="UDK_APP_TEST")
cursor = db.cursor()

# print all in database
cursor.execute("SELECT * FROM Fake_News")
result = cursor.fetchall()
for x in result:
    print(x)

# try to add a thing
add_story = '''INSERT INTO Fake_News (headline, author, blurb, body, date_posted) VALUES (%s, %s, %s, %s, %s)'''
cursor.execute(add_story, story_data)

# print again
cursor.execute("SELECT * FROM Fake_News")
result = cursor.fetchall()
for x in result:
    print(x)


