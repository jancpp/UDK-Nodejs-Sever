import url_list
from data_in import _article_to_story
from log import Log

story_objects = []
error = False
error_count = 0
urlnum = 1
for _list in url_list.files:
    print(url_list.files.__repr__())
    for url in _list:
        try:
            story = _article_to_story(url)
            story_objects.append(story)
            urlnum += 1
        except:
            if error_count >= 10:
                print('More than 10 errors have occured. Terminating Process.')
                print('Check error.txt for more information.')
                break
            error = True
            error_count += 1
            error_message = 'Unable to convert article to story!\n'
            error_message += _list.
            error_message += url
            Log.error_to_file(error_message)

if error and error_count < 10:
    url_list
    print('Errors occured! Check error.txt')