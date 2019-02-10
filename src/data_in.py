from bs4 import BeautifulSoup
import requests

SEARCH_PAGE_URL = 'http://www.kansan.com/search/?s=start_time&sd=asc&l=25&t=article&nsa=eedition'
TEST_ARTICLE_OLD = 'http://www.kansan.com/news/ice-storm-remnants-pose-threat/article_6dc5f5b6-0ca9-59e9-8572-11f167ae9443.html'
TEST_ARTICLE_MIDDLE = 'http://www.kansan.com/news/that-s-disgusting-bugs-in-food/article_25562341-d7e2-554d-aa47-94653a5e3038.html'
TEST_ARTICLE_NEW = 'http://www.kansan.com/sports/ku-track-and-field-splits-up-for-record-breaking-first/article_563c7476-2c4d-11e9-b5c8-d3a4a0cc9ae9.html'

class Story:

    #constructor
    def __init__(self, url, main_image, headline, author, date, body):
        self.url = url
        self.main_image = main_image
        self.headline = headline
        self.author = author
        self.date = date
        self.body = body

    def __str__(self):
        s = ""
        s += "\nUrl:\t" + self.url
        if(self.main_image is not None):
            s += "\nMain_Image:\n" + self.main_image

        s += "\nHeadline:\t" + self.headline
        s += "\nAuthor:\t" + self.author
        s += "\nDate:\t" + self.date
        s += "\nBody:\t"
        for elem in self.body:
            s += elem
            s += '\n'
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


#_private

# params: <String> url of search page
# return: <List<String>> article urls
# desc:   _get_urls works on the search results page of the UDK, this function is for building our database.
def _get_urls(search_url):

    article_urls = []
    html_article = requests.get(search_url).text
    soup = BeautifulSoup(html_article, 'lxml')      # lxml parameter?

    articles = soup.find_all('h3', class_='tnt-headline')
    for article in articles:
        article_url = article.find('a')['href']
        story_url = 'http://www.kansan.com' + article_url
        article_urls.append(story_url)

    # get next results url ??
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

    main_image = _mine_main_image(article)
    headline = _mine_headline(article)
    author = _mine_author(article)
    date = _mine_date(article)
    body = _mine_body(article)

    s = Story(article_url, main_image, headline, author, date, body)
    print('STORY:\n', s, 'END STORY\n\n')
    return(s)

def _mine_main_image(article):
    img = article.find('div', id='asset-photo')
    if(img is None):
        return None
    else:
        return img.find('meta', itemprop='contentUrl')['content']
     

def _mine_headline(article):
    headline_area = article.find('header', class_='asset-header')
    bad_headline = headline_area.find('h1', itemprop='headline').text
    return "".join(line.strip() for line in bad_headline.split('\n'))

def _mine_author(article):
    headline_area = article.find('header', class_='asset-header')
    author = headline_area.find('span', itemprop='author').text
    return author

def _mine_date(article):
    headline_area = article.find('header', class_='asset-header')
    date = headline_area.find('time').text
    return date

def _mine_body(article):
    body = []
    article_body = article.find('div', itemprop='articleBody')
    for child in article_body.children:
        if child.name == 'p':
            ptext = '$$$PARAGRAPH$$$' + child.text
            body.append(ptext)
        elif child.name == 'aside':
            atext = '$$$ASIDE$$$' + child.text
            body.append(atext)
        elif child.name == 'div' and 'inline-image' in child['class']:
            # TODO: Get the byline of the image, but how to store??
            imgsrc = '$$$IMAGE$$$' + child.find('meta', itemprop='contentUrl')['content']
            body.append(imgsrc)
        else:
            print("UNMATCHED ELEMENT IN ARTICLE BODY", child)

    return body
# params: <String> search results url
# return: <String> "incremented" search results url
def _get_next_results_url(results_url):
    # this substring appears in all urls after the initial one
    if('&app%5B0%5D=editorial' not in results_url):
        # after that the only difference is the final number
        return results_url + '&app%5B0%5D=editorial&o=10'
    else:
        # increment final number
        # find the '='
        index = 0
        num = ""

        while results_url[index-1] != '=':
            index -= 1

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

test = get_story(TEST_ARTICLE_OLD)
test = get_story(TEST_ARTICLE_MIDDLE)
test = get_story(TEST_ARTICLE_NEW)
