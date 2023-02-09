
import sqlite3

from app import connect_db, app
from fask_db_class import FlaskDataBase


def create_db():
    ''' Вспомогательная функция для создания таблиц БД'''
    db = connect_db()
    with app.open_resource('sql_db.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    db.close()
    pass

#dfgdfgdfgdfg



if __name__ == '__main__':
    db = connect_db()
    dbase = FlaskDataBase(db)
    print(dbase.addmenu('Главная', 'index_db'))
    print(dbase.addmenu('Добавить статью', 'add_post'))
    print(dbase.dellmenu())
    print(create_db.__doc__)
    create_db()