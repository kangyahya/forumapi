const LikeUnlikeUseCase = require('../../../../Applications/use_case/LikeUnlikeUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;
  }

  async likeUnlikeHandler(request, h) {
    const likeUnlikeUseCase = this._container
      .getInstance(LikeUnlikeUseCase.name);
    const { id: credentialId } = request.auth.credentials;
    const { threadId, commentId } = request.params;
    await likeUnlikeUseCase.execute({
      thread_id: threadId,
      comment_id: commentId,
      user_id: credentialId,
    });

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;
