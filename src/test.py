from data_in import *
from store import *

SEARCH_PAGE_URL = 'http://www.kansan.com/search/?s=start_time&sd=asc&l=25&t=article&nsa=eedition'
TEST_ARTICLE_OLD = 'http://www.kansan.com/news/ice-storm-remnants-pose-threat/article_6dc5f5b6-0ca9-59e9-8572-11f167ae9443.html'
TEST_ARTICLE_MIDDLE = 'http://www.kansan.com/news/that-s-disgusting-bugs-in-food/article_25562341-d7e2-554d-aa47-94653a5e3038.html'
TEST_ARTICLE_NEW = 'http://www.kansan.com/sports/ku-track-and-field-splits-up-for-record-breaking-first/article_563c7476-2c4d-11e9-b5c8-d3a4a0cc9ae9.html'

def run_tests():
    res = run_search_page_test()
    print('''\n\n\n---------------SEARCH PAGE TEST COMPLETED SUCCESSFULLY-------------------\n\n\n''')
    run_article_breakdown_test()
    print('''\n\n\n---------------ARTICLE BREAKDOWN  TEST COMPLETED SUCCESSFULLY-------------------\n\n\n''')
    #run_article_store_test()
    insert_test(res)
    print('''\n\n\n---------------INSERT TEST COMPLETED SUCCESSFULLY-------------------\n\n\n''')

def run_search_page_test():
    results = list_stories(SEARCH_PAGE_URL)
    for result in results:
        print(result)
    return results

def run_article_breakdown_test():
    old_story = get_story(TEST_ARTICLE_OLD)
    med_story = get_story(TEST_ARTICLE_MIDDLE)
    new_story = get_story(TEST_ARTICLE_NEW)

def insert_test(stories):
    l = list_stories(SEARCH_PAGE_URL)
    for story in l:
        o = get_story(story)
        put_story(o)



run_tests()
