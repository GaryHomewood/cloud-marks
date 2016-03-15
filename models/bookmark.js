var mongoose = require('mongoose');
var moment = require('moment');

var bookmarkSchema = mongoose.Schema({
    note: String,
    name: String,
    url: String,
    tags: [String],
    createdDate: {type: Date, default: Date.now}
});

bookmarkSchema.virtual('timeSince').get(function() {
    var created = moment(this.createdDate);
    var now = moment();
    return moment.duration(now.diff(created)).humanize() + ' ago';
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
