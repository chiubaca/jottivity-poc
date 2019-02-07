import zipfile
import os
import json

all_blogs = []

def extractPosts(zipFileName, extractLocation):
    zip_ref = zipfile.ZipFile( zipFileName, 'r')
    zip_ref.extractall(extractLocation)
    zip_ref.close()

#extractPosts("./all_posts.zip" ,"./temp") 

# an array of all files in the temp folder
MDFiles = os.listdir("./temp")

#loop through all files
for blog in MDFiles:

    #Read a posts
    with open ("temp/" + blog, "rt") as testMDFile:
        print("opening " + blog)
        blog_obj = {}
        lines = testMDFile.readlines()
        
        blog_title = lines[0]
        blog_date = lines[2]
        blog_mood = lines[3]
        blog_productivity = lines[4] 
        blog_contents = lines[6]

        blog_obj = {
            "title": blog_title,
            "date" : blog_date,
            "mood" : blog_mood,
            "productivity" : blog_productivity,
            "contents" : blog_contents
                    }

        all_blogs.append(blog_obj)

# print(all_blogs)
with open("all_blogs.json", "w") as outfile:
    json.dump(all_blogs, outfile)