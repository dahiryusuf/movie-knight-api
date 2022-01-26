// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const bodyParser = require("body-parser");
// const cookieSession = require('cookie-session');
// router.use(bodyParser.urlencoded({extended: true}));
// router.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }));
// /* GET users listing. */
// router.get("/login", (req, res) => {
//   if (req.session["user_id"]) {
//    return res.redirect(`/`);
//   }
//   const templateVars = { username: req.session["user_id"]};
//   res.render("login", templateVars);
// });

// module.exports = router;
