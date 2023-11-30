const LikeRepository = require('../../Domains/likes/LikeRepository');
// eslint-disable-next-line no-unused-vars
const CommentRepository = require('../../Domains/comments/CommentRepository');
// eslint-disable-next-line no-unused-vars
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class LikeUnlikeUseCase {
  constructor({
    threadRepository,
    commentRepository,
    likeRepository,
  }) {
    /** @type ThreadRepository */
    this._threadRepository = threadRepository;
    /** @type CommentRepository */
    this._commentRepository = commentRepository;
    /** @type LikeRepository */
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { comment_id: commentId, user_id: userId, thread_id: threadId } = useCasePayload;
    await this._threadRepository.isThreadExist(threadId);
    await this._commentRepository.isCommentExist(commentId);
    const isUserLike = await this._likeRepository.isUserLike(commentId, userId);
    if (isUserLike) {
      return this._likeRepository.unlike(commentId, userId);
    }
    return this._likeRepository.like(commentId, userId);
  }

  _validatePayload(payload) {
    const { comment_id: commentId, user_id: userId } = payload;
    if (!commentId || !userId) {
      throw new Error('LIKE_UNLIKE_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string' || typeof commentId !== 'string') {
      throw new Error('LIKE_UNLIKE_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = LikeUnlikeUseCase;
