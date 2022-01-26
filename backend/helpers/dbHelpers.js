module.exports = (db) => {
  const getUsers = () => {
      const query = {
          text: 'SELECT * FROM users',
      };

      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const getUserByEmail = email => {

      const query = {
          text: `SELECT * FROM users WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  }

  const addUser = (firstName, lastName, email, password) => {
      const query = {
          text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
          values: [firstName, lastName, email, password]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }
  const addWatchParty = (link, message, date, userId) => {
      const winner = 'https://github.com/dahiryusuf/final_project/blob/hufan/frontend/public/shutterstock_1074043505.jpg?raw=true'
    const query = {
        text: `INSERT INTO watch_parties(link, messages, party_date, winner, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
        values: [link, message, date, winner, userId]
  }       
        return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  }
  const addToUserWatchlist = ( movie_id,poster_path, user_id) => {
    const query = {
        text: `INSERT INTO watch_lists (movie_id,poster_path, user_id) VALUES ($1, $2, $3) RETURNING *` ,
        values: [movie_id, poster_path, user_id]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}
const addToMovielist = (movie_id, watch_party_id) => {
    const query = {
        text: `INSERT INTO movie_lists (movie_id, watch_party_id) VALUES ($1, $2) RETURNING *` ,
        values: [movie_id, watch_party_id]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}
const addToMoviePicks = (movie_id, watch_party_id) => {
    const query = {
        text: `INSERT INTO movie_picks (movie_id, watch_party_id) VALUES ($1, $2) RETURNING *` ,
        values: [movie_id, watch_party_id]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}


  const getUsersPosts = () => {
      const query = {
          text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
      }

      return db.query(query)
          .then(result => result.rows)
          .catch(err => err);
  }

  const getUsersWatchLists = () => {
    const query = {
        text: `SELECT users.id as user_id, first_name, last_name, email, watch_lists.id as watch_list_id, movie_id
        FROM users
        INNER JOIN watch_lists
        ON users.id = watch_lists.user_id`
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}

const getUserWatchList = (id) => {
    const query = {
        text: (`SELECT * FROM watch_lists WHERE user_id = ${id};`)
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);
}
const getUserWatchParties = (id) => {
    const query = {
        text: (`SELECT * FROM watch_parties WHERE user_id = ${id};`)
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}
const getUserWatchListId = (id) => {
    const query = {
        text: (`Select id From watch_parties Where link = '${id}';`)
    }
    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}

const removeFromWatchList = (movie_id) => {
    const query = {
        text: (`DELETE FROM watch_lists WHERE id = ${movie_id};`)
    }
    

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}
const removeFromWatchParties = (id) => {
    const query = {
        text: (`DELETE FROM watch_parties WHERE id = ${id};`)
    }
    

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}
const getUserMovieList = (id) => {
    const query = {
        text: (`SELECT * FROM movie_lists WHERE watch_party_id = ${id};`)
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}
const getMoviePicks = (id) => {
    const query = {
        text: (`SELECT movie_id, count(watch_party_id) FROM movie_picks WHERE watch_party_id = ${id} GROUP BY movie_id ORDER BY count DESC;`)
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

}
const updateWatchParty = (poster_path, id) => {
    const query = {
        text: (`UPDATE watch_parties
        SET winner =${poster_path}
        WHERE id = ${id};`)
  }       
        return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  }

  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUsersPosts,
      getUsersWatchLists,
      addWatchParty,
      addToUserWatchlist,
      getUserMovieList,
      getUserWatchList,
      getMoviePicks,
      getUserWatchListId,
      addToMovielist,
      addToMoviePicks,
      getUserWatchList,
      removeFromWatchList,
      getUserWatchParties,
      removeFromWatchParties,
      updateWatchParty
  }
}
