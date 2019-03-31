import datetime
import logging
from bs4 import BeautifulSoup
import requests

today_date_str = datetime.date.today().__str__()
datain_logfile = "log/datain/" + today_date_str + ".log"

logging.basicConfig(filename=datain_logfile, level=logging.DEBUG)

def escape(s):
    if s == None:
        return s

    ILLEGAL = ['\'', '\"', '\\', ':', '-', '_']
    padding = 0
    for i,c in enumerate(s):
        if c in ILLEGAL:
            s = s[:i+padding] + '\\' + s[i+padding:]
            padding = padding+1
    return s

class Story:

    #constructor
    def __init__(self, url, main_image, mib, headline, author, date, category, body):
        self.url = url
        self.main_image = main_image
        self.main_image_byline = mib
        self.headline = headline
        self.author = author
        self.date = date
        self.category = category
        self.body = body

    def __str__(self):
        s = ""
        s += "\nUrl:\t" + self.url
        s += "\nHeadline:\t" + self.headline
        s += "\nAuthor:\t" + self.author
        s += "\nDate:\t" + str(self.date)

        s += ( ("\nCategory:\t" + self.category) if (self.category is not None) else ("\nCategory:\tNone") )
        s += ( ("\nMain Image:\t" + self.main_image) if (self.main_image is not None) else ("\nMain Image:\tNone") )
        s += "\nBody:\t" + self.body

        return s

# params: <String> url of article
# return: <Story> object containing article info at url
def get_story(article_url):
    return(_article_to_story(article_url))

def list_stories(search_url):
    return _get_urls(search_url)

# params: <String> url of search page
# return: <List<Story>> results of search
def get_stories(search_url):
    debug.info("Getting stories from search url: ", search_url)
    search_stories = []
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
    articles = soup.find_all('article')

    #remove print edition articles
    for article in articles:
        print(article['class'])
        if 'tnt-section-print-edition' in article['class']:
            print("removed: {}".format(article.find('h3', class_='tnt-headline')))
            articles.remove(article)
    

    for article in articles:
        header = article.find('h3', class_='tnt-headline')
        article_url = header.find('a')['href']
        story_url = 'http://www.kansan.com' + article_url
        article_urls.append(story_url)

    

    # get next results url ??
    #button_soup = soup.find('div', class_='pagination-container')
    #next_results_url = _get_next_results_url(button_soup)
    #print(next_results_url)
    return article_urls

# params: <String> url of article
# return: <Story> parsed article
def _article_to_story(article_url):
    print("mining: {}".format(article_url))
    source = requests.get(article_url).text
    soup = BeautifulSoup(source, 'lxml')
    article = soup.find('article')
    

    # required
    try:
        headline = _mine_headline(article)
        print('got headline')
    except Exception as e:
        debug.warn(e.what(), " article url: article_url")
        raise(e)
    try:
        author = _mine_author(article)
        print('got author')
    except Exception as e:
        debug.warn(e.what(), " article url: article_url")
        raise(e)
    try:
        date = _mine_date(article)
        print('got date')
    except Exception as e:
        debug.warn(e.what(), " article url: article_url")
        raise(e)


    # optional
    try:
        main_image, img_byline = _mine_main_image(article)
        print('got image info')
    except Exception as e:
        debug.warn(e.what(), " article url: article_url")
        raise(e)

    try:
        body = _mine_body(article)
        print('got body')
    except Exception as e:
        debug.warn(e.what(), " article url: article_url")
        raise(e)

    category_area = soup.find('body')
    if category_area == None:
        debug.warn("Unable to locate a category for story from story url: ", article_url)
        raise Exception("Could not find category_area (body of html doc)!")
    category = _mine_category(category_area)
    print('got category')


    s = Story(article_url, main_image, img_byline, headline, author, date, category, body)
    print("constructed story\n")

    return(s)

def _mine_main_image(article):
    img = None
    img_byline = None

    img_area = article.find('div', id='asset-photo')
    
    if(img_area is not None):
        img = img_area.find('meta', itemprop='contentUrl')['content']

        img_byline = img_area.find('figcaption', class_='caption')
        if(img_byline.find('p') is not None):
            img_byline = img_byline.find('p').text
        elif(img_byline.find('span', class_='tnt-byline') is not None):
            img_byline = img_byline.find('span', class_='tnt-byline').text

    return img, img_byline
     

def _mine_headline(article):
    headline_area = article.find('header', class_='asset-header')
    if headline_area == None:
        raise Exception('Could not find headline area in article.')

    jumbled_headline = headline_area.find('h1', itemprop='headline').text
    if jumbled_headline == None:
        raise Exception('Could not find headline in article.')

    return "".join(line.strip() for line in jumbled_headline.split('\n'))

def _mine_author(article):
    headline_area = article.find('header', class_='asset-header')
    author = headline_area.find('span', itemprop='author').text
    if author == None:
        raise Exception('Could not find author in headline area.')

    return author

def breakdown_date_text(text):
    return text[:4], text[5:7], text[8:10]

def _mine_date(article):
    headline_area = article.find('header', class_='asset-header')
    text = headline_area.find('meta', itemprop='datePublished')['content']
    if text == None:
        raise Exception('Could not find date text in headline area')

    year, month, day = breakdown_date_text(text)
    
    try:
        date = datetime.date(int(year), int(month), int(day))
        return date
    except ValueError as ve:
        print("Error parsing date: {}".format(ve.args))

    return None

def _mine_category(body):
    c = body['class']
    print(c)
    if "category-sports" in c:
        return 'sports'
    elif "category-arts-and-culture" in c:
        return 'arts'
    else:
        return 'none'

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

        elif (child.name == 'div') and ('inline-image' in child['class']):
            # TODO: Get the byline of the image, but how to store??
            imgsrc = '$$$IMAGE$$$' + child.find('meta', itemprop='contentUrl')['content']
            body.append(imgsrc)
        elif child.name == 'blockquote':
            print('\n\n***DEBUG*** Tweet located.\n')
            tweet_url = '$$$TWEET$$$' + child.find_all('a')[-1]['href']
            body.append(tweet_url)
        elif child.name == 'ul':
            print('DO SOMETHING WITH BULLETED LIST - RIGHT NOW WE SKIP')
            
        else:
            print("UNMATCHED ELEMENT IN ARTICLE BODY", child)

    b = ""
    for body_elem in body:
        b += body_elem
        
    return b

    
# params: <String> search results url
# return: <String> "incremented" search results url
def _get_next_results_url(results_url):
    # this substring appears in all urls after the initial one
    if('&app%5B0%5D=editorial' not in results_url):
        # after that the only difference is the final number
        return results_url + '&app%5B0%5D=editorial&o=50'
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
        num = str(int(num) + 50)#increment it

        # rewrite that portion of the string.
        results_url = results_url[:firstindex]# slice off the number
        results_url += num# add the new one
        debug.info("Next search url is: ", results_url)
        return(results_url)
