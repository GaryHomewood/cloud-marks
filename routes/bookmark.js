var Bookmark = require('../models/bookmark.js');

module.exports = function(app, passport) {
    app.get('/bookmark', isLoggedIn, function(req, res) {
        var b = new Bookmark();
        b.url = req.query.url;
        b.name = req.query.title;
        res.render('bookmark', {
            bookmark: b,
            bookmarkId: '',
            popup: req.query.p
        });
    });

    app.get('/bookmark/:id', isLoggedIn, function(req, res) {
        Bookmark.findOne({'_id': req.params.id}, function(err, bookmark) {
            res.render('bookmark', {
                bookmark: bookmark,
                bookmarkId: bookmark._id,
                popup: 0
            });
        });
    });

    app.post('/bookmark', isLoggedIn, function(req, res) {
        if (req.body.id != '') {
            if (req.body._method == 'delete') {
                Bookmark.findByIdAndRemove(req.body.id, function(err, b) {
                    res.redirect('/');
                });
            } else {
                Bookmark.findOne({'_id': req.body.id}, function(err, b) {
                    b.url = req.body.url;
                    b.name = req.body.name;
                    b.note = req.body.note;
                    b.tags = encodeTags(req.body.tags);
                    b.save(function(err) {
                        res.send();
                    })
                });
            }
        } else {
            var b = new Bookmark();
            b.url = req.body.url;
            b.name = req.body.name;
            b.note = req.body.note;
            b.tags = encodeTags(req.body.tags);
            b.save(function(err) {
                res.send();
            });
        }
    });
}

function encodeTags(tags) {
    var inputTags = tags.split(',');
    var outputTags = [];
    for (var i = 0; i < inputTags.length; i++) {
        outputTags.push(inputTags[i].trim());
    }
    return outputTags;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
