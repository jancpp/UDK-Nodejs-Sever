import sys
import data_in
import store

SEARCH_PAGE = 'http://www.kansan.com/search/?s=start_time&sd=asc&l=50&t=article&nsa=eedition'

# windup:   get search results until we fail or run out, write to a file
# parse:    given search results file, parse the articles until we fail, and store them in a file
# put:      take parsed stories and store them in database

# option x: do all of the previous in sequence

def windup(start):
    place = SEARCH_PAGE
    urls = data_in._get_urls(place)
    print(urls)
    place = data_in._get_next_results_url(place)
    print("Next: {}".format(place))
    return urls



def parse(story_urls):
    stories = []
    for url in story_urls:
        s = data_in.get_story(url)
        print("\n\nStory: {}\n\n".format(s))
        stories.append(s)
    return stories
            

    print('parse')
    return None

def put(stories):
    for story in stories:
        store.put_story(story)
    return None

def start():
    # delete all entries from database
    store.reset_database()

    urls = []
    stories = []

    try:
        urls = windup(SEARCH_PAGE)
    except Exception as e:
        print("Something went wrong calling windup in fill: {}".format(e.args))

    try:
        stories = parse(urls)
    except Exception as e:
        print("Something went wrong calling parse in fill: {}".format(e.args))
    
    try:
        put(stories)
    except Exception as e:
        print("Something went wrong calling put in fill: {}".format(e.args))

start()