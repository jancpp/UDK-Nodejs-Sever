import data_in
from datetime import date, datetime
import mysql.connector

# connect to database (local for testing)
db = mysql.connector.connect(host="localhost", user="root", password="daily_kansan_news", database="UDK_APP_TEST")
cursor = db.cursor()

# print all in database
cursor.execute("SELECT * FROM Fake_News")
result = cursor.fetchall()
for x in result:
    print(x)

# print again
cursor.execute("SELECT * FROM Fake_News")
result = cursor.fetchall()
for x in result:
    print(x)

# need error handling here
def put_story(s):
    db = mysql.connector.connect(host="104.248.235.9", user="root", password="daily_kansan_news", database="NEWS_V1")
    cursor = db.cursor()
    q = '''INSERT INTO News_V1 (url, headline, author, date, main_image, body) VALUES (%s, %s, %s, %s, %s, %s)'''
    data = (s.url, s.headline, s.author, s.date, s.main_image, s.body)
    cursor.execute(q, data)

