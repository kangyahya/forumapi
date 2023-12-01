// eslint-disable-next-line no-unused-vars
const Handler = require('./handler');

/**
 *
 * @param {Handler} handler
 * @returns
 */
const routes = (handler) => ([
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes',
    handler: handler.likeUnlikeHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
]);

module.exports = routes;
