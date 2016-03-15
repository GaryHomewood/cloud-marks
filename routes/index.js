var Bookmark = require('../models/bookmark.js');

module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function(req, res) {

        var tag = req.query.tag ? req.query.tag.trim() : '';

        var cbFindAll = function(err, tags) {
            var cb = function(err, bookmarks) {
                res.render('index', {
                    user: req.user,
                    bookmarks: bookmarks,
                    allTags: tags,
                    filter: tag
                })};

            if (tag.length > 0) {
                Bookmark.find({ tags: tag })
                    .sort({ createdDate: -1 })
                    .limit(25)
                    .exec(cb);
            } else {
                Bookmark.find()
                    .sort({ createdDate: -1 })
                    .limit(25)
                    .exec(cb);
            }
        }

        Bookmark.distinct('tags').sort().exec(cbFindAll);
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
