const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const NewThread = require("../../../Domains/threads/entities/NewThread");

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
        // Arrange
    const useCasePayload = {
          title: 'Sample Thread',
          body: 'This is a sample thread body',
          owner: 'user123',
        };
    // Mock ThreadRepository
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest.fn(async () => ({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    }));
    // Create AddThreadUseCase instance with the mock repository
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload);
    // Assert
    expect(addedThread).toEqual({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(new NewThread(useCasePayload));
  });
});
