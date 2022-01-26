DROP TABLE IF EXISTS watch_parties CASCADE;

CREATE TABLE watch_parties(
    id SERIAL PRIMARY KEY NOT NULL,
    link VARCHAR(255) NOT NULL,
    messages TEXT,
    party_date VARCHAR(255) NOT NULL, 
    winner VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);