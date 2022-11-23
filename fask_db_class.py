import sqlite3


class FlaskDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def addmenu(self, title, url):
        try:
            self.__cur.execute("INSERT INTO mainmenu VALUES(NULL,?,?)", (title, url))
            self.__db.commit()
        except sqlite3.Error as e:
            print('Ошибка добавления в меню БД'+str(e))
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