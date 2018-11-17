from bs4 import BeautifulSoup
import requests

class Story:
    def __init__(self, headline, author, date, image_urls, body):#allow for more images later
        self.headline = headline
        self.author = author
        self.date = date
        self.image_urls = image_urls
        self.body = body

    def __str__(self):
        s = ""
        s += "\nHeadline:\t" + str(self.headline)
        s += "\nAuthor:\t" + str(self.author)
        s += "\nDate:\t" + str(self.date)
        s += "\nImages:\t" + str(self.image_urls)
        s += "\nBody:\t" + str(self.body)
        return s

# return: Story object containing article at url
# params: String url to article page
# effect: none
def get_story(article_url):
    return(_article_to_story(article_url))

# return: List of Story objects found by rss search page
# params: String url to search page
# effect: none
def get_stories(search_url):
    search_stories = list()
    for art in _get_urls(search_url):
        search_stories.append(_article_to_story(art))
    return search_stories


#private

# return: List of String article urls
# params: String url for search page
# effect: none
def _get_urls(search_url):
    source = requests.get(search_url).text
    soup = BeautifulSoup(source, 'lxml')
    articles = soup.find_all('h3', class_='tnt-headline')
    article_urls = list()
    for art in articles:
        art_url = art.find('a')['href']
        story_url = 'http://www.kansan.com' + art_url
        article_urls.append(story_url)
    return article_urls

# return: Story object from parsed article
# params: String url for article page
# effect: none
def _article_to_story(article_url):
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
    return Story(headline, author, date, images, article_body)
