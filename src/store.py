import sys
import data_in
from datetime import date, datetime
import mysql.connector
from mysql.connector.cursor import MySQLCursorPrepared

def put_story(s):
    print("trying to put story: {}".format(s))

    try:
        db = mysql.connector.connect(host="localhost", user="remote", password="sugarsugar", database="UDK", use_pure=True)
        cursor = db.cursor(cursor_class=MySQLCursorPrepared)
        q = """INSERT INTO ARTICLES (url, headline, author, date, main_image, main_image_byline, body, category) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"""
        input = (s.url, s.headline, s.author, s.date.strftime("%Y/%m/%d"), s.main_image, s.main_image_byline, s.body, s.category)
        print(q)
        print(input)
        print("setup")
        cursor.execute(q, params=input)
        print("executed")
        db.commit()

        print("Stored successfully!")
    except mysql.connector.Error as err:
        print("Something went wrong calling put_story in store: {}".format(err))
    except NotImplementedError as err:
        if db.warning_count > 0:
            print(cursor._fetch_warnings())
        print("Caught NotImplementedError calling put_story in store: {}".format(err))
    except:
        print("Unexpected error: ", sys.exc_info()[0])

def reset_database():
    try:
        db = mysql.connector.connect(host="localhost", user="remote", password="sugarsugar", database="UDK")
        cursor = db.cursor()
        q = "TRUNCATE TABLE ARTICLES;"
        cursor.execute(q)
        db.commit()

        print("All database entries deleted, I hope you meant to do that.")
    except mysql.connector.Error as err:
        print("Something went wrong calling reset_database in store: {}".format(err))