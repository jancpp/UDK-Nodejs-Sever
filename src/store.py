import data_in
from datetime import date, datetime
import mysql.connector

# need error handling!!
def put_story(s):

    try:
        db = mysql.connector.connect(host="localhost", user="remote", password="sugarsugar", database="UDK")
        cursor = db.cursor()
        q = "INSERT INTO ARTICLES (url, headline, author, date, main_image, main_image_byline, body) VALUES ({}, {}, {}, {}, {}, {}, {})".format(s.url, s.headline, s.author, s.date, s.main_image, s.main_image_byline s.body)
        print(q)

        cursor.execute(q)
        db.commit()

        print("Stored successfully!")
    except mysql.connector.Error as err:
        print("Something went wrong!: {}".format(err))

