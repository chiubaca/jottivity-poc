import zipfile
import os


def extractPosts(zipFileName, extractLocation):
    zip_ref = zipfile.ZipFile( zipFileName, 'r')
    zip_ref.extractall(extractLocation)
    zip_ref.close()

# extractPosts("./all_posts.zip" ,"./temp") 

# an array of all files in the temp folder
MDFiles = os.listdir("./temp")

print(MDFiles)

#Read a single test post and print
with open ("temp/" + MDFiles[2], "rt") as testMDFile:
    
    lines = testMDFile.readlines()
    blog_title = lines[0]
    blog_date = lines[2]
    blog_mood = lines[3]
    blog_productivity = lines[4] 
    blog_contents = lines[6]

# read the title and print 
    print(blog_title)
# read the date and print
    print(blog_date)
# read the mood and print
    print(blog_mood)
# read productivity and print 
    print(blog_productivity)
# read contents and print
    print(blog_contents)