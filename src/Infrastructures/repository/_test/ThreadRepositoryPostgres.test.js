const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const NewThread = require("../../../Domains/threads/entities/NewThread");

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread', () => {
    it('should persist new thread and return added thread correctly', async () => {
      const newThread = new NewThread({
        title: 'Sample Thread',
        body: 'This is a sample thread body',
        owner: 'user-123',
      });
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      await UsersTableTestHelper.addUser({id:'user-123'});
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread);
      // Assert
      expect(addedThread.id).toEqual('thread-123');
      expect(addedThread.title).toBe(newThread.title);
      expect(addedThread.owner).toBe(newThread.owner);

      // Verify data in the database
      const persistedThread = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(persistedThread.id).toEqual('thread-123');
      expect(persistedThread.title).toEqual(newThread.title);
      expect(persistedThread.owner).toEqual(newThread.owner);
    });
  });

  describe('isThreadExist', () => {
    it('should return true if thread exists', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.isThreadExist('thread-123')).resolves.toBe(true);
    });

    it('should return false if thread not exists', async () => {
      // Arrange
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(repository.isThreadExist('thread-123')).resolves.toBe(false);
    });
  });

  describe('getThreadById', () => {
    it('should return null if thread not exists', async () => {
      // Arrange
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await repository.getThreadById('thread-123');

      // Assert
      expect(thread).toBeNull();
    });

    it('should return thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await repository.getThreadById('thread-123');

      // Assert
      expect(thread.id).toEqual('thread-123');
      expect(thread.title).toEqual('title');
      expect(thread.body).toEqual('body');
      expect(thread.date).toEqual(expect.any(String));
      expect(thread.username).toEqual('dicoding');
      expect(thread.comments).toEqual([]);
    });
  });
});
