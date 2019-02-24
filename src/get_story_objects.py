#!/usr/bin/python
import requests
from bs4 import BeautifulSoup
import lxml
import pickle
#get storys

beginning_results_url = 'http://www.kansan.com/search/?f=html&s=start_time&sd=asc&l=100&t=article&nsa=eedition'
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

def get_article_urls(start, end, results_url):
    urls = []
    url = results_url
    while start < end:
        urls.append(_get_urls(url))
        url = _get_next_results_url(url)
        start += 100
        print(start)
    next_url = url
    return urls
    
def get_many_urls():
    # we want to get 35000 urls
    num = 35000
    next_url = beginning_results_url
    big_url_list = []
    while num > 0:
        big_url_list.append(get_article_urls(0, 2500, next_url))
        num -= 2500
    with open('urllist1.pkl', 'wb') as f:
        pickle.dump(big_url_list, f)





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
        num = str(int(num) + 100)#increment it

        # rewrite that portion of the string.
        results_url = results_url[:firstindex]# slice off the number
        results_url += num# add the new one
        return(results_url)