const express = require('express');
const router = express.Router();
const {
    getPostsByUsers,
    getWatchListByUsers,
    getWatchListByUser,
    
    
} = require('../helpers/dataHelpers');

module.exports = ({
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    getUsersWatchLists,
    addToUserWatchlist,
    getUserWatchList,
    getUserMovieList,
    getMoviePicks,
    getUserWatchListId,
    addToMovielist,
    addToMoviePicks,
    removeFromWatchList,
    getUserWatchParties,
    removeFromWatchParties,
    updateWatchParty
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/posts', (req, res) => {
        getUsersPosts()
            .then((usersPosts) => {
                const formattedPosts = getPostsByUsers(usersPosts);
                res.json(formattedPosts);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/watchlist/:id', (req, res) => {
        console.log(req.params)
        const id = req.params.id
        getUserWatchList(id)
            .then((watchlist) => { 
                res.json(watchlist);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    router.get('/movielist/:id', (req, res) => {
        console.log(req.params)
        const id = req.params.id
        getUserMovieList(id)
            .then((movielist) => { 
                res.json(movielist);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/watchparties/:id', (req, res) => {
        console.log(req.params.id)
        const id = req.params.id
        getUserWatchParties (id)
            .then((watchparties) => { 
                res.json(watchparties);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    router.post('/watchparties/:id', (req, res) => {
        const id = req.params.id
        const poster_path = req.body.poster_path
        console.log(req.body)
        updateWatchParty(poster_path, id)
            .then((watchparties) => { 
                res.json(watchparties);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/watchlists', (req, res) => {
        getUsersWatchLists()
            .then((watchLists) => {
                const formattedPosts = getWatchListByUsers(watchLists);
                res.json(formattedPosts);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    router.get('/moviepicker/:id', (req, res) => {
        console.log(req.params)
        const id = req.params.id
        getUserWatchListId(id)
            .then((moviepicks) => { 
                res.json(moviepicks);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    router.get('/moviepicks/:id', (req, res) => {
        console.log(req.params)
        const id = req.params.id
        getMoviePicks(id)
            .then((moviepicks) => { 
                res.json(moviepicks);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
    router.post('/watchlist/delete/', (req, res) => {
        const  {movie_id
        } = req.body;
     
        removeFromWatchList(movie_id)
            .then(nMovie => res.json(nMovie))
            .catch(err => res.json({
                error: err.message
            }));
    })

    router.post('/watchpartiess/delete/', (req, res) => {
        const  {movie_id}
        = req.body
        console.log("req.body.movie_id")
     
        removeFromWatchParties(movie_id)
            .then(nMovie => res.json(nMovie))
            .catch(err => res.json({
                error: err.message
            }));
    })

    router.post('/movielist/:id', (req, res) => {

        const  {movie_id
        } = req.body;

        const watch_party_id = req.params.id;

        addToMovielist(movie_id, watch_party_id)
            .then(neMovie => res.json(neMovie))
            .catch(err => res.json({
                error: err.message
            }));
    })
    router.post('/moviepicks/:id', (req, res) => {

        const  {movie_id, poster_path
        } = req.body;

        const watch_party_id = req.params.id;

        addToMoviePicks(movie_id, watch_party_id)
            .then(nMovie => res.json(nMovie))
            .catch(err => res.json({
                error: err.message
            }));
    })
    router.post('/watchlist/:id', (req, res) => {

        const  {movie_id,
            poster_path
        } = req.body;

        const user_id = req.params.id;
        console.log(req.body)

        addToUserWatchlist(movie_id,poster_path, user_id)
            .then(newMovie => res.json(newMovie))
            .catch(err => res.json({
                error: err.message
            }));
    })
    


    return router;
};