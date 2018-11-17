import data_in

#story = data_in.parse_article(story_urls[0])
stories = data_in.get_stories('http://www.kansan.com/search/?f=html&s=start_time&sd=asc&l=10&t=article&nsa=eedition')

for story in stories:
    print(str(story))