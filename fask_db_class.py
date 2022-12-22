import math
import sqlite3
import time


class FlaskDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def addmenu(self, title, url):
        try:
            self.__cur.execute("INSERT INTO mainmenu VALUES(NULL,?,?)", (title, url))
            self.__db.commit()
        except sqlite3.Error as e:
            print('Ошибка добавления в меню БД' + str(e))
            return False
        return True

    def dellmenu(self):
        try:
            self.__cur.execute("DELETE FROM mainmenu ")
            self.__db.commit()
        except sqlite3.Error as e:
            print('Ошибка удаления в меню БД  ' + str(e))
            return False
        return True

    def getmenu(self):
        try:
            sql = ''' SELECT * FROM mainmenu'''
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except:
            print('Ошибка получения меню БД')

        return []

    def addPost(self, title, text, url):
        try:
            self.__cur.execute("SELECT COUNT() as 'count' FROM post WHERE url LIKE ?", (url,))
            res = self.__cur.fetchone()
            if res['count'] > 0:
                print('Cтатья с таким url уже существует')
                return False
            tm = math.floor(time.time())
            self.__cur.execute("INSERT INTO post VALUES (NULL, ?, ?, ?, ?)", (title, text, url, tm))
            self.__db.commit()

        except sqlite3.Error as e:
            print('Ошибка добавления статьи в БД', str(e))
            return False
        return True
    def getPosts(self):
        try:
            sql = '''SELECT id, title, text, url FROM post ORDER BY time DESC'''
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print('Ошибка получения статьи из БД', str(e))
        return []
