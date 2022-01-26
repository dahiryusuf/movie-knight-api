DROP TABLE IF EXISTS movie_lists CASCADE;

CREATE TABLE movie_lists(
    id SERIAL PRIMARY KEY NOT NULL,
    movie_id VARCHAR(255) NOT NULL,
    watch_party_id INTEGER REFERENCES watch_parties(id) ON DELETE CASCADE
);