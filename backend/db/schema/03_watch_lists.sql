DROP TABLE IF EXISTS watch_lists CASCADE;

CREATE TABLE watch_lists(
    id SERIAL PRIMARY KEY NOT NULL,
    movie_id VARCHAR(255) NOT NULL,
    poster_path VARCHAR(255),
    user_id INTEGER REFERENCES users(id)
);