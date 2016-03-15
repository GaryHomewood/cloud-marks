$('.ui.accordion').accordion();

$('#bookmarkForm').submit(function(e) {
    e.preventDefault();
    $.post('/bookmark', $(this).serialize())
        .done(function(data) {
            Bookmarks.manageBookmarkPage();
        });
});

$('#cancelBookmark').click(function(e) {
    e.preventDefault();
    Bookmarks.manageBookmarkPage();
});

var Bookmarks = (function() {
    return {
        manageBookmarkPage: manageBookmarkPage
    }

    function manageBookmarkPage() {
        if ($('#isPopup').val() == '1') {
            window.close();
        } else {
            window.location.href = '/';
        }
    }
})();

$('#toggleEdit').click(function(e) {
    $('.bookmark-buttons').toggle('medium');
});
