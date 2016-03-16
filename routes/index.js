var Bookmark = require('../models/bookmark.js');
var querystring = require('querystring');

module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function(req, res) {
        var tags = req.query['tags'];
        var filter = tags ? {tags: tags} : {};
        var pageSize = 20;
        var page = req.query['p'] > 0 ? req.query['p'] : 0;

        Bookmark.distinct('tags')
            .sort()
            .exec(function(err, allTags) {
                Bookmark.find(filter)
                    .count()
                    .exec(function(err, count) {
                        Bookmark.find(filter)
                            .sort({ createdDate: -1 })
                            .skip(pageSize * page)
                            .limit(pageSize)
                            .exec(function(err, bookmarks) {

                                var prevQueryString = filter;
                                prevQueryString.p = parseInt(page) - 1;
                                prevQueryString = querystring.stringify(prevQueryString);

                                var nextQueryString = filter;
                                nextQueryString.p = parseInt(page) + 1;
                                nextQueryString = (querystring.stringify(nextQueryString));

                                res.render('index', {
                                    bookmarks: bookmarks,
                                    allTags: allTags,
                                    filter: filter,
                                    pages: Math.ceil(count / pageSize),
                                    page: page,
                                    prevQueryString: prevQueryString,
                                    nextQueryString: nextQueryString,
                                    count: count
                                });
                            });
                    })
            });
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
