DROP TABLE IF EXISTS MovieTable;
CREATE TABLE IF NOT EXISTS MovieTable(
    ID SERIAL PRIMARY KEY,
    original_title varchar(255),
    release_date varchar(255),
    poster_path varchar(255),
    overview varchar(255),
    myComment varchar(255)

);