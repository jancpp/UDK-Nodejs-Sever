import sys
import data_in
import store

SEARCH_PAGE = 'http://www.kansan.com/search/?s=start_time&sd=asc&l=50&t=article&nsa=eedition'

# windup:   get search results until we fail or run out
# parse:    given search results file, parse the articles until we fail
# put:      take parsed stories and store them in database

# option x: do all of the previous in sequence

def windup(start):
    urls = data_in._get_urls(start)

    # filter print edition (again)
    g_urls = []
    for url in urls:
        if 'print_edition' not in url:
            g_urls.append(url)
        else:
            print('MISSED PRINT EDITION ON FIRST FILTER: {}'.format(url))

    print('windup')
    return g_urls



def parse(story_urls):
    stories = []
    for url in story_urls:
        s = data_in.get_story(url)
        stories.append(s)
    print('parse')
    return stories
            

def put(stories):
    for story in stories:
        store.put_story(story)
    print('put')

def start():
    # store.reset_database()
    f = open('fill.config')
    search_page = f.readline()
    f.close()

    urls = []
    stories = []

    while True: 
        try:
            urls = windup(search_page)
        except Exception as e:
            print("Something went wrong calling windup in fill: {}".format(e.args))
            f = open('fill.config', 'w')
            f.write(search_page)
            break
        
        if len(urls) == 0:
            break

        try:
            stories = parse(urls)
        except Exception as e:
            print("Something went wrong calling parse in fill: {}".format(e.args))
            f = open('fill.config', 'w')
            f.write(search_page)
            break

        try:
            put(stories)
        except Exception as e:
            print("Something went wrong calling put in fill: {}".format(e.args))
            f = open('fill.config', 'w')
            f.write(search_page)
            break

start()
