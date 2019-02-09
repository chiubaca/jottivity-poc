import zipfile
import os
import json
from datetime import datetime

#all blogs will be processed and pushed into this list
all_blogs = []

## Manualy extract post for now, this script cant handle some ascii characters like hearts
## some post may need to manually fixed...
# def extractPosts(zipFileName, extractLocation):
#     zip_ref = zipfile.ZipFile( zipFileName, 'r')
#     zip_ref.extractall(extractLocation)
#     zip_ref.close()
# extractPosts("./all_posts.zip" ,"./temp") 

# a list of all files in the temp folder
MDFiles = os.listdir("./temp")

#loop through all files - and covert data into json object
for blog in MDFiles:

    #Read a posts
    with open ("temp/" + blog, "rt") as testMDFile:
        print("processing " + blog)
        blog_obj = {}
        lines = testMDFile.readlines()
        
        # cleans the title removes '# ' and other trailing spaces
        blog_title = lines[0][2:-1].strip()
         #cleans dates string and covert it to proper date time stamp
        blog_date =  str(datetime.strptime(lines[2][6:-1], '%b %d, %Y')) 
        # cleans string and coverts all moods to a list
        blog_mood = lines[3][6:-1].split(',')
        # cleans string and coverts all productivity to a list
        blog_productivity = lines[4][14:-1].split(',')
        # no cleaning required on the contents 
        blog_contents = lines[6]
        
        # individual blog object
        blog_obj = {
            "title": blog_title, #string
            "date" : blog_date, #string
            "mood" : blog_mood, #list
            "productivity" : blog_productivity, #list
            "contents" : blog_contents #string
                    }

        all_blogs.append(blog_obj)

# Export the all_blog list to a json file
with open("all_blogs.json", "w") as outfile:
    json.dump(all_blogs, outfile)