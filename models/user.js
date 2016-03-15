// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
//
// var userSchema = mongoose.Schema({
//     local: {
//         email: String,
//         password: String,
//     }
// });
//
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
//
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
//
// module.exports = mongoose.model('User', userSchema);

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

// exports.findByUsername = function(username, cb) {
//     process.nextTick(function() {
//         for (var i = 0, len = records.length; i < len; i++) {
//             var record = records[i];
//             if (record.email === username) {
//                 return cb(null, record);
//             }
//         }
//         return cb(null, null);
//   });
// }
//
exports.findByEmail = function(email, cb) {
    process.nextTick(function() {
        if (email === process.env.EMAIL) {
            return cb(null, users[0]);
        }
        return cb(null, null);
  });
}
