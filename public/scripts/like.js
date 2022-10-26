function likeFreet(fields) {
    fetch(`/api/like/${fields.freetId}`, { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
        .then(showResponse)
        .catch(showResponse);
}

function unlikeFreet(fields) {
    fetch(`/api/like/${fields.freetId}`, { method: 'DELETE' })
        .then(showResponse)
        .catch(showResponse);
}


function getFreetLikes(fields) {
    fetch(`/api/like/${fields.freetId}`)
        .then(showResponse)
        .catch(showResponse);
}