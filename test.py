import data_in
import url_list

#story = data_in.parse_article(story_urls[0])
#stories = data_in.get_stories('http://www.kansan.com/search/?f=html&s=start_time&sd=asc&l=10&t=article&nsa=eedition')

# for story in stories:
#     print(story.headline)
#     print(story.author)
#     print(story.date + '\n')
#     print(story.body)
#print(data_in._get_next_results_url('http://www.kansan.com/search/?f=html&s=start_time&sd=asc&l=10&t=article&nsa=eedition&app%5B0%5D=editorial&o=20'))

# story = data_in.get_story('http://www.kansan.com/news/prince-of-persia-warrior-within/article_3a735582-0844-57ff-96d8-cffe94940362.html')

# print('\n' + story.headline)
# print(story.author)
# print(story.date + '\n')
# print(story.body)

url = 'http://www.kansan.com/search/?f=html&s=start_time&sd=asc&l=100&t=article&nsa=eedition'

data_in.get_all_story_urls(url)

# _url_list = url_list.url_list
# story_count = 0
# story_list = []
# for url in _url_list:
#     story_list.append(data_in._article_to_story(url))
#     story_count += 1
#     print(story_count)