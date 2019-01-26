import zipfile
import os


def extractPosts(zipFileName, extractLocation):
    zip_ref = zipfile.ZipFile( zipFileName, 'r')
    zip_ref.extractall(extractLocation)
    zip_ref.close()

extractPosts("./all_posts.zip" ,"./temp") 

#test md file to test out frontmatter lib
MDFiles = os.listdir("./temp")
print(MDFiles[0])


     