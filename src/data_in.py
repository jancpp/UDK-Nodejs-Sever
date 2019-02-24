from bs4 import BeautifulSoup
import requests
import datetime

def escape(s):
    ILLEGAL = ['\'', '\"']
    for i,c in enumerate(s):
        if c in ILLEGAL:
            s = s[:i] + '\\' + s[i:]
    return s

class Story:

    #constructor
    # NOTE: MISSING 'SECTION' as in arts-and-culture or sports or whatever
    def __init__(self, url, main_image, mib, headline, author, date, body):
        self.url = url
        self.main_image = main_image
        self.main_image_byline = mib
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

    articles = soup.find_all('h3', class_='tnt-headline')
    for article in articles:
        article_url = article.find('a')['href']
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

    source = requests.get(article_url).text
    soup = BeautifulSoup(source, 'lxml')
    article = soup.find('article')
    
    print("mining story ", article_url)

    # required
    headline = _mine_headline(article)
    author = _mine_author(article)
    date = _mine_date(article)

    # optional
    main_image, img_byline = _mine_main_image(article)
    body = _mine_body(article)

    s = Story(escape(article_url), escape(main_image), escape(img_byline), escape(headline), escape(author), date, escape(body))

    return(s)

def _mine_main_image(article):
    img = article.find('div', id='asset-photo')
    img_byline = img.find('figcaption', class_='caption').find('p').text

    if(img is None):
        return None
    else:
        return img.find('meta', itemprop='contentUrl')['content'], img_byline
     

def _mine_headline(article):
    headline_area = article.find('header', class_='asset-header')
    bad_headline = headline_area.find('h1', itemprop='headline').text
    return "".join(line.strip() for line in bad_headline.split('\n'))

def _mine_author(article):
    headline_area = article.find('header', class_='asset-header')
    author = headline_area.find('span', itemprop='author').text
    return author

def breakdown_date_text(text):
    return text[:4], text[5:7], text[8:10]

def _mine_date(article):
    headline_area = article.find('header', class_='asset-header')
    text = headline_area.find('div', class_='meta').find('meta', itemprop='datePublished').content
    year, month, day = breakdown_date_text(text)
    date = datetime.date(year, month, day)
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

        elif (child.name == 'div') and ('inline-image' in child['class']):
            # TODO: Get the byline of the image, but how to store?? as a double?
            imgsrc = '$$$IMAGE$$$' + child.find('meta', itemprop='contentUrl')['content']
            body.append(imgsrc)
        elif child.name == 'blockquote':
            print('\n\n***DEBUG*** Tweet located.\n')
            tweet_url = '$$$TWEET$$$' + child.find_all('a')[-1]['href']
            body.append(tweet_url)
            
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
