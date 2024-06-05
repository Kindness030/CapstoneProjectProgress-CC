const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/threads',
    method: 'POST',
    handler: postForumHandler,
  },
  {
    path: '/forum',
    method: 'GET',
    handler: postForumHandler,
  }
]

module.exports = routes;