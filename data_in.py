from bs4 import BeautifulSoup
import requests


#Goal: return a story object.
class Story:
    def __init__(self, headline, author, date, image_urls, body):#allow for more images later
        self.headline = headline
        self.author = author
        self.date = date
        self.image_urls = image_urls
        self.body = body



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

# parse_article() parses a story url and returns a story object.
# example url: http://www.kansan.com/news/travel-web-sites-save-money/article_21523515-484f-571a-9bbd-a8f938c8e597.html
def parse_article(article_url):
    source = requests.get(article_url).text
    soup = BeautifulSoup(source, 'lxml')
    article = soup.find('article')
   
    headline_area = article.find('header', class_='asset-header')
    temp_headline = headline_area.find('h1', itemprop='headline').text
    #headline is a span. remove redundant whitespace
    headline = "".join(line.strip() for line in temp_headline.split('\n'))
    author = headline_area.find('span', itemprop='author').text
    date = headline_area.find('time').text

    article_body = article.find('div', itemprop='articleBody')
    paragraphs = article_body.find_all('p')
    article_body = str()
    for p in paragraphs:#These paragraphs contain links to urls. TODO: Ensure these links display properly on mobile.
        article_body += (p.text + '\n\n')
    article_body = article_body[:-2]#remove final endlines
    
    images = None#NOTE: In current testing there are no images present. Image checking/storage needs to be implemented as well.
    return(Story(headline, author, date, images, article_body))
