import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { PrismaService } from '../database/prisma.service';

describe('TagsService', () => {
  let service: TagsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, PrismaService],
    }).compile();

    service = module.get<TagsService>(TagsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTags', () => {
    it('should return an array of tags', async () => {
      const tags = [
        { id: '1', name: 'tag1', slug: 'tag1', description: 'tag1' },
        { id: '2', name: 'tag2', slug: 'tag2', description: 'tag1' },
      ];
      jest.spyOn(prismaService.tag, 'findMany').mockResolvedValue(tags);

      const result = await service.getTags();

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
      jest.spyOn(prismaService.tag, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.tag, 'create').mockResolvedValue(createdTag);

      const result = await service.createTag(tagInput);

      expect(result).toEqual(createdTag);
    });

    it('should return the existing tag if it already exists', async () => {
      const tagInput = { name: 'existingTag' };
      const existingTag = {
        id: '1',
        name: 'existingTag',
        slug: 'existingtag',
        description: 'existingtag',
      };
      jest
        .spyOn(prismaService.tag, 'findUnique')
        .mockResolvedValue(existingTag);

      const result = await service.createTag(tagInput);

      expect(result).toEqual(existingTag);
    });
  });

  describe('getTagsByPostId', () => {
    it('should return an array of tags for the given post ID', async () => {
      const postId = '1';
      const tags = [
        { id: '1', name: 'tag1', slug: 'tag1', description: 'tag1' },
        { id: '2', name: 'tag2', slug: 'tag2', description: 'tag2' },
      ];
      jest.spyOn(prismaService.tag, 'findMany').mockResolvedValue(tags);

      const result = await service.getTagsByPostId(postId);

      expect(result).toEqual(tags);
    });
  });
});
