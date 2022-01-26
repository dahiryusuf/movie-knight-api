const express = require('express');
const router = express.Router();
module.exports = ({
  addWatchParty
}) => {
  router.get('/watchparties', (req, res) => {
    getUsers()
        .then((users) => res.json(users))
        .catch((err) => res.json({
            error: err.message
        }));
});
router.post('/newparty', (req, res) => {

  const {
    link, 
    message, 
    date, 
    userId
  } = req.body;

      addWatchParty(link, message, date, userId)
      .then(newWatchParty => res.json(newWatchParty))
      .catch(err => res.json({
          error: err.message
      }));
    });
return router;
};