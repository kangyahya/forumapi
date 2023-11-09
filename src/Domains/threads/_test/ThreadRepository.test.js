const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository abstract', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const threadRepository = new ThreadRepository();
    try {
      await threadRepository.addThread({});
    } catch (error) {
      expect(error.message).toBe('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    try {
      await threadRepository.isThreadExist('threadId');
    } catch (error) {
      expect(error.message).toBe('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    try {
      await threadRepository.getThreadById('threadId');
    } catch (error) {
      expect(error.message).toBe('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  });
});
