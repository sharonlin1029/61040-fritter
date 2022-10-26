function bookmarkFreet(fields) {
    fetch(`/api/bookmark/${fields.freetId}/${fields.category == '' ? 'None' : fields.category}`, { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
    .then(showResponse)
    .catch(showResponse);
}

function unbookmarkFreet(fields) {
    fetch(`/api/bookmark/${fields.freetId}`, { method: 'DELETE' })
        .then(showResponse)
        .catch(showResponse);
}

function moveBookmarkToAnotherCategory(fields) {
    fetch(`/api/bookmark/${fields.freetId}/${fields.category == '' ? 'None' : fields.category}`, { method: 'PUT', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
        .then(showResponse)
        .catch(showResponse);
}

function getAllBookmarks(fields) {
    fetch('/api/bookmark')
        .then(showResponse)
        .catch(showResponse);
}

function getAllBookmarkCategories(fields) {
    fetch('/api/bookmark/categories')
        .then(showResponse)
        .catch(showResponse);
}

function getBookmarksInCategory(fields) {
    fetch(`/api/bookmark?category=${fields.category == '' ? 'None' : fields.category}`)
        .then(showResponse)
        .catch(showResponse);
}