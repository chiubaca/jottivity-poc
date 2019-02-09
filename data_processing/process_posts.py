import zipfile
import os
import json
from datetime import datetime

#all blogs will be processed and pushed into this list
all_blogs = []


def extractPosts(zipFileName, extractLocation):
    zip_ref = zipfile.ZipFile( zipFileName, 'r')
    zip_ref.extractall(extractLocation)
    zip_ref.close()

# an array of all files in the temp folder
MDFiles = os.listdir("./temp")

#loop through all files
for blog in MDFiles:

    #Read a posts
    with open ("temp/" + blog, "rt") as testMDFile:
        # print("processing " + blog)
        blog_obj = {}
        lines = testMDFile.readlines()
        
        blog_title = lines[0][2:-1].strip()
        blog_date =  str(datetime.strptime(lines[2][6:-1], '%b %d, %Y')) #Sep 20, 2018
        blog_mood = lines[3][6:-1].split(',')
        blog_productivity = lines[4][14:-1].split(',') 
        blog_contents = lines[6]
     
        # # print(blog_title)
        # clean_title = re.compile(r'# \b')
        # matches = clean_title.finditer(blog_title)
        # for match in matches:
        #         print(match)

        # print (blog_title[2:])

        blog_obj = {
            "title": blog_title,
            "date" : blog_date,
            "mood" : blog_mood,
            "productivity" : blog_productivity,
            "contents" : blog_contents
                    }

        all_blogs.append(blog_obj)

# print(all_blogs)
with open("all_blogs_eg.json", "w") as outfile:
    json.dump(all_blogs, outfile)