var users = [
    {
        id: 1,
        email: '',
        password: ''
    }
];

exports.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (users[idx]) {
            cb(null, users[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByEmail = function(email, cb) {
    process.nextTick(function() {
        if (email === process.env.EMAIL) {
            return cb(null, users[0]);
        }
        return cb(null, null);
  });
}
