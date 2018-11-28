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

# return: Story object containing article at url
# params: String url to article page
# effect: none
def get_story(article_url):
    return(_article_to_story(article_url))

# return: List of Story objects found by rss search page
# params: String url to search results page
# effect: none
def get_stories(search_url):
    search_stories = list()
    for art in _get_urls(search_url):
        search_stories.append(_article_to_story(art))
    return search_stories


######################################################## private

# return: List of String article urls
# params: String url for search results page
# effect: none
def _get_urls(search_url):
    print('GET Request Sent!')
    source = requests.get(search_url).text
    print('GET Request Complete!')
    #print('in _get_urls()')
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
# throws: error if can't parse story correctly
def _article_to_story(article_url):
    source = requests.get(article_url).text
    soup = BeautifulSoup(source, 'lxml')
    article = soup.find('article')
   
    # put try catch around each of these? so we can determine where exactly it failed
    headline = _get_headline(article)
    author = _get_author(article)
    date = _get_date(article)

    # get article body
    # body = _get_body(article)
    paragraphs = article.find('div', itemprop='articleBody').find_all('p')
    article_body = ""

    # These paragraphs contain links to articles. TODO: Ensure these links display properly on mobile.
    # Need to retain seperation of paragraphs somehow. Put a character between them? So we can format them correctly on mobile.
    for p in paragraphs:
        if(p.span):
            article_body += p.span.text
        else:
            article_body += (p.text + '\n\n')
    
    #remove final endlines
    article_body = article_body[:-2]
    
    # In current testing there are no images present. Image checking/storage needs to be implemented as well.
    images = None
    
    return(Story(headline, author, date, images, article_body))


# maybe put this story parsing stuff in it's own module?
def _get_headline(article):
    headline_area = article.find('header', class_='asset-header')
    temp_headline = headline_area.find('h1', itemprop='headline').text
    headline = "".join(line.strip() for line in temp_headline.split('\n'))
    return headline

def _get_author(article):
    author = article.find('header', class_='asset-header').find('span', itemprop='author').text
    return author

def _get_date(article):
    date = article.find('header', class_='asset-header').find('time').text
    return date






# return: String url for the next search results page
# params: String url for the current search results page
# effect: none
def _get_next_results_url(results_url, increment):
    # this substring appears in all urls after the initial one
    if('&app%5B0%5D=editorial' not in results_url):
        # after that the only difference is the final number
        return results_url + '&app%5B0%5D=editorial&o=' + str(increment)
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
        num = str(int(num) + increment)#increment it
        # rewrite that portion of the string.
        results_url = results_url[:firstindex]# slice off the number
        results_url += num# add the new one
        return(results_url)

def get_all_story_urls(initial_search_results_url):
    count = 0
    url = initial_search_results_url
    urls = _get_urls(url)
    filename = 1
    with open('url_list.txt', 'a') as f:
        while len(urls) > 0:
            count += len(urls)
            for _url in urls:
                f.write(_url + ', ')
            f.write('\n')
            next_results_url = _get_next_results_url(url, 100)
            url = next_results_url
            urls = _get_urls(next_results_url)
            if count % 100 == 0:
                print('Recorded ' + str(count) + ' urls...')
            if count % 4000 == 0:
                f.close()
                f = open('url_list' + str(filename) + '.txt', 'a')
                print('Switched to file url_list' + str(filename) + '.txt')
                filename += 1
