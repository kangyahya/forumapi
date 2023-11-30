const LikeRepository = require('../../../Domains/likes/LikeRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const LikeUnlikeUseCase = require('../LikeUnlikeUseCase');

describe('LikeUseCase.test', () => {
  it('should throw error if use case payload not contain id', async () => {
    // Arrange
    const useCasePayload = {
      comment_id: 'comment-123',
    };
    const likeUnlikeUseCase = new LikeUnlikeUseCase({});

    // Action & Assert
    await expect(likeUnlikeUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('LIKE_UNLIKE_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if id not string', async () => {
    // Arrange
    const useCasePayload = {
      comment_id: 123,
      user_id: 'user-123',
    };
    const likeUnlikeUseCase = new LikeUnlikeUseCase({});

    // Action & Assert
    await expect(likeUnlikeUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('LIKE_UNLIKE_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the like thread comment action correctly', async () => {
    /// Arrange
    const user = {
      id: 'user-123',
      username: 'username',
    };
    const thread = {
      id: 'thread-123',
      title: 'A title of thread',
    };
    const comment = {
      id: 'comment-123',
      content: 'A content of comment',
      thread_id: thread.id,
      user_id: user.id,
    };
    const useCasePayload = {
      thread_id: thread.id,
      comment_id: comment.id,
      user_id: user.id,
    };
    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();
    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockLikeRepository.isUserlike = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.unlike = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.like = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    const likeUnlikeUseCase = new LikeUnlikeUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    const addedComment = await likeUnlikeUseCase.execute(useCasePayload);

    // // Assert
    expect(addedComment).toEqual(true);
    expect(mockThreadRepository.isThreadExist)
      .toBeCalledWith(thread.id);
    expect(mockCommentRepository.isCommentExist)
      .toBeCalledWith(comment.id);
    expect(mockLikeRepository.isUserlike)
      .toBeCalledWith(comment.id, user.id);
    expect(mockLikeRepository.like)
      .toBeCalledTimes(0);
    expect(mockLikeRepository.unlike)
      .toBeCalledWith(comment.id, user.id);
  });

  it('should orchestrating the unlike action correctly', async () => {
    /// Arrange
    const user = {
      id: 'user-123',
      username: 'username',
    };
    const thread = {
      id: 'thread-123',
      title: 'A title of thread',
    };
    const comment = {
      id: 'comment-123',
      content: 'A content of comment',
      thread_id: thread.id
      user_id: user.id
    };
      const useCasePayload = {
        thread_id: thread.id,
        comment_id: comment.id,
        user_id: user.id,
      };
      /** creating dependency of use case */
      const mockThreadRepository = new ThreadRepository();
      const mockCommentRepository = new CommentRepository();
      const mockLikeRepository = new LikeRepository();
    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockLikeRepository.isUserLike = jest.fn()
      .mockImplementation(() => Promise.resolve(false));
    mockLikeRepository.unlike = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.like = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    const likeUnlikeUseCase = new LikeUnlikeUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    const addedComment = await likeUnlikeUseCase.execute(useCasePayload);

    // // Assert
    expect(addedComment).toEqual(true);
    expect(mockThreadRepository.isThreadExist)
      .toBeCalledWith(thread.id);
    expect(mockCommentRepository.isCommentExist)
      .toBeCalledWith(comment.id);
    expect(mockLikeRepository.isUserlike)
      .toBeCalledWith(comment.id, user.id);
    expect(mockLikeRepository.unlike)
      .toBeCalledTimes(0);
    expect(mockLikeRepository.like)
      .toBeCalledWith(comment.id, user.id);
  });
});
