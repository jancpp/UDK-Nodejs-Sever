from bs4 import BeautifulSoup
import requests

class Story:
    def __init__(self, headline, author, date, image_urls, body):
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

# params: <String> url of article
# return: <Story> object containing article info at url
def get_story(article_url):
    return(_article_to_story(article_url))

# params: <String> url of search page
# return: <List<Story>> results of rss search
def get_stories(search_url):
    search_stories = list()
    for art in _get_urls(search_url):
        search_stories.append(_article_to_story(art))
    return search_stories


#private

# params: <String> url of search page
# return: <List<String>> article urls
def _get_urls(search_url):
    source = requests.get(search_url).text
    soup = BeautifulSoup(source, 'lxml')
    articles = soup.find_all('h3', class_='tnt-headline')
    article_urls = list()
    for art in articles:
        art_url = art.find('a')['href']
        story_url = 'http://www.kansan.com' + art_url
        article_urls.append(story_url)
    # get next results url
    button_soup = soup.find('div', class_='pagination-container')
    next_results_url = _get_next_results_url(button_soup)
    print(next_results_url)
    return article_urls

# params: <String> url of article
# return: <Story> parsed article
def _article_to_story(article_url):
    source = requests.get(article_url).text
    soup = BeautifulSoup(source, 'lxml')
    article = soup.find('article')
   
    headline_area = article.find('header', class_='asset-header')
    temp_headline = headline_area.find('h1', itemprop='headline').text
    # headline is a span. remove redundant whitespace
    headline = "".join(line.strip() for line in temp_headline.split('\n'))
    author = headline_area.find('span', itemprop='author').text
    date = headline_area.find('time').text

    article_body = article.find('div', itemprop='articleBody')
    paragraphs = article_body.find_all('p')
    article_body = str()

    # These paragraphs contain links to urls. TODO: Ensure these links display properly on mobile.
    for p in paragraphs:
        article_body += (p.text + '\n\n')
    article_body = article_body[:-2]#remove final endlines

    images = None# NOTE: In current testing there are no images present. Image checking/storage needs to be implemented as well.
    return(Story(headline, author, date, images, article_body))


# return: <String> search results url
# params: <String> "incremented" search results url
def _get_next_results_url(results_url):
    # this substring appears in all urls after the initial one
    if('&app%5B0%5D=editorial' not in results_url):
        # after that the only difference is the final number
        return results_url + '&app%5B0%5D=editorial&o=10'
    else:
        # increment final number
        # find the '='
        index = -1
        while results_url[index] != '=':
            index -= 1
        num = str()
        index += 1

        # cache index where new number should start
        firstindex = index
        # determine what that number currently is
        while index != 0:
            num += (results_url[index])
            index += 1
        num = str(int(num) + 10)#increment it

        # rewrite that portion of the string.
        results_url = results_url[:firstindex]# slice off the number
        results_url += num# add the new one
        return(results_url)