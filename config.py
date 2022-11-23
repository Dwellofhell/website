import os
import sys
from pprint import pprint

class Config:
    SECRET_KEY =  os.environ.get('SECRET KEY') or'dhme;kghjanrkael/jgbuilarelkjmgbipuehjmghiotrkjhtoikle'
    DEBUG = True
    DATABASE = 'flaskdb.db'


#print(sys.path)