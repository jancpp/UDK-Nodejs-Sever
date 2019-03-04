import sys
from data_in import *
from store import *

SEARCH_PAGE = 'http://www.kansan.com/search/?s=start_time&sd=asc&l=50&t=article&nsa=eedition'

# windup:   get search results until we fail or run out, write to a file
# parse:    given search results file, parse the articles until we fail, and store them in a file
# put:      take parsed stories and store them in database

# option x: do all of the previous in sequence

def windup(start):
    place = SEARCH_PAGE
    for i in range(10):
        urls = data_in._get_urls(place)
        print(urls)
        place = data_in._get_next_results_url(place)
        print("Next: {}".format(place))



def parse(story_urls):
    print('parse')

def put(stories):
    print('put')

def start():
    put(parse(windup(SEARCH_PAGE)))

start()