from bs4 import BeautifulSoup
import requests


#Goal: return a story object.
class Story:
    def __init__(self, headline, author, date, image_urls, body):#allow for more images later
        pass



# get_urls() returns a list of all stories listed at a UDK search url.
# example url: http://www.kansan.com/search/?f=html&s=start_time&sd=asc&l=10&t=article&nsa=eedition
# passing this url will return a list of the first 10 stories on the UDK website.
def get_urls(search_url):
    source = requests.get(search_url).text
    soup = BeautifulSoup(source, 'lxml')
    articles = soup.find_all('h3', class_='tnt-headline')
    article_urls = list()
    for art in articles:
        art_url = art.find('a')['href']
        story_url = 'http://www.kansan.com' + art_url
        article_urls.append(story_url)
    return article_urls