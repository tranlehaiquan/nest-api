import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { DatabaseService } from '../database/database.service';

describe('TagsService', () => {
  let service: TagsService;
  let mockDb: any;

  beforeEach(async () => {
    // Create mock database with Drizzle query builder pattern
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn().mockReturnThis(),
    };

    const mockDatabaseService = {
      db: mockDb,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTags', () => {
    it('should return an array of tags', async () => {
      const tags = [
        { id: '1', name: 'tag1', slug: 'tag1' },
        { id: '2', name: 'tag2', slug: 'tag2' },
      ];
      
      mockDb.select.mockReturnValue(mockDb);
      mockDb.from.mockResolvedValue(tags);

      const result = await service.getTags();

      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalled();
      expect(result).toEqual(tags);
    });
  });

  describe('createTag', () => {
    it('should create a new tag if it does not exist', async () => {
      const tagInput = { name: 'newTag' };
      const createdTag = {
        id: '1',
        name: 'newTag',
        slug: 'newtag',
        description: 'newTag',
      };

      // Mock the check for existing tag (returns empty array)
      mockDb.select.mockReturnValue(mockDb);
      mockDb.from.mockReturnValue(mockDb);
      mockDb.where.mockReturnValue(mockDb);
      mockDb.limit.mockResolvedValue([]); // No existing tag

      // Mock the insert operation
      mockDb.insert.mockReturnValue(mockDb);
      mockDb.values.mockReturnValue(mockDb);
      mockDb.returning.mockResolvedValue([createdTag]);

      const result = await service.createTag(tagInput);

      expect(result).toEqual(createdTag);
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalled();
      expect(mockDb.returning).toHaveBeenCalled();
    });

    it('should return the existing tag if it already exists', async () => {
      const tagInput = { name: 'existingTag' };
      const existingTag = {
        id: '1',
        name: 'existingTag',
        slug: 'existingtag',
        description: 'existingTag',
      };

      // Mock the check for existing tag (returns the existing tag)
      mockDb.select.mockReturnValue(mockDb);
      mockDb.from.mockReturnValue(mockDb);
      mockDb.where.mockReturnValue(mockDb);
      mockDb.limit.mockResolvedValue([existingTag]);

      const result = await service.createTag(tagInput);

      expect(result).toEqual(existingTag);
      expect(mockDb.insert).not.toHaveBeenCalled();
    });
  });

  describe('getTagsByPostId', () => {
    it('should return an array of tags for the given post ID', async () => {
      const postId = '1';
      const tags = [
        { id: '1', name: 'tag1', slug: 'tag1' },
        { id: '2', name: 'tag2', slug: 'tag2' },
      ];

      mockDb.select.mockReturnValue(mockDb);
      mockDb.from.mockReturnValue(mockDb);
      mockDb.innerJoin.mockReturnValue(mockDb);
      mockDb.where.mockResolvedValue(tags);

      const result = await service.getTagsByPostId(postId);

      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalled();
      expect(mockDb.innerJoin).toHaveBeenCalled();
      expect(mockDb.where).toHaveBeenCalled();
      expect(result).toEqual(tags);
    });
  });
});
