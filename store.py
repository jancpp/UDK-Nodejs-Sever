import data_in
import mysql.connector

#test = Story("Test Story", "Ethan M", "1/9/19", "no images", "This is a story meant to act as a placeholder. Please do not seek any meaning here as you will only find heartbreak and disappointment.")
db = mysql.connector.connect(host="localhost", user="root", password="daily_kansan_news", database="UDK_APP_TEST")
print(db)
cursor = db.cursor()
cursor.execute("SELECT * FROM Fake_News")
result = cursor.fetchall()
for x in result:
    print(x)