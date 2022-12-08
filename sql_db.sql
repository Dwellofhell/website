create table if not exists mainmenu (
id integer primary key autoincrement,
title text not null,
url text not null
);

create table if not exists post (
id integer primary key autoincrement,
title text not null,
text text not null,
url text not null,
time integer not null
);