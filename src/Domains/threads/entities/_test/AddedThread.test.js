const AddedThread = require('../AddedThread');

describe('AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddedThread(payload))
      .toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: true,
      owner: {},
    };

    // Action and Assert
    expect(() => new AddedThread(payload))
      .toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedThread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'Sample Thread',
      owner: 'user123',
    };
    // Action
    const addedThread = new AddedThread(payload);
    // Assert
    expect(addedThread).toBeInstanceOf(AddedThread);
    expect(addedThread.id).toBe(payload.id);
    expect(addedThread.title).toBe(payload.title);
    expect(addedThread.owner).toBe(payload.owner);
  });
});
