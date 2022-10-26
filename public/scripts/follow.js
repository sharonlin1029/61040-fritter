function followUser(fields) {
  fetch(`/api/follow/${fields.username}`, { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch(`/api/follow/${fields.username}`, { method: 'DELETE' })
    .then(showResponse)
    .catch(showResponse);
}

function getFollowers(fields) {
  fetch('/api/follow/followers')
    .then(showResponse)
    .catch(showResponse);
}

function getFollowing(fields) {
  fetch('/api/follow/following')
    .then(showResponse)
    .catch(showResponse);
}

function getUsersFeed(fields) {
  fetch(`/api/follow/feed?filter=${fields.filter}`)
    .then(showResponse)
    .catch(showResponse);
}
