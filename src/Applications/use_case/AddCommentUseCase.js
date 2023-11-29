const NewComment = require('../../Domains/comments/entities/NewComment');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const newComment = new NewComment(useCasePayload);
    const isThreadExist = await this._threadRepository.isThreadExist(newComment.threadId);
    if (!isThreadExist) {
      throw new NotFoundError('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
