import data_in
from datetime import date, datetime
import mysql.connector

# need error handling!!
def put_story(s):
    db = mysql.connector.connect(host="localhost", user="remote", password="sugarsugar", database="UDK")
    cursor = db.cursor()
    q = '''INSERT INTO Articles (url, headline, author, date, main_image, body) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')''' % (s.url, s.headline, s.author, s.date, s.main_image, s.body)
    print(q)

    cursor.execute(q)
    db.commit()
    print("Stored successfully!")

