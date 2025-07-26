import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User table
export const users = pgTable('User', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(),
  bio: text('bio').default('').notNull(),
  image: text('image'),
  salt: text('salt').notNull(),
  hash: text('hash').notNull(),
});

// Post table
export const posts = pgTable('Post', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  body: text('body').notNull(),
  published: boolean('published').default(false),
  authorId: uuid('authorId')
    .notNull()
    .references(() => users.id),
  slug: text('slug').unique().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  deleted: timestamp('deleted'),
});

// Tag table
export const tags = pgTable('Tag', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  slug: text('slug').notNull(),
});

// Follows table (many-to-many relationship)
export const follows = pgTable('Follows', {
  followerId: uuid('followerId')
    .notNull()
    .references(() => users.id),
  followingId: uuid('followingId')
    .notNull()
    .references(() => users.id),
});

export const followsPrimaryKey = primaryKey({
  columns: [follows.followerId, follows.followingId],
});

// Comment table
export const comments = pgTable('Comment', {
  id: uuid('id').primaryKey().defaultRandom(),
  body: text('body').notNull(),
  authorId: uuid('authorId')
    .notNull()
    .references(() => users.id),
  postId: uuid('postId')
    .notNull()
    .references(() => posts.id),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  deleted: timestamp('deleted'),
});

// UserFavoriteComment table (many-to-many relationship)
export const userFavoriteComments = pgTable('UserFavoriteComment', {
  userId: uuid('userId')
    .notNull()
    .references(() => users.id),
  commentId: uuid('commentId')
    .notNull()
    .references(() => comments.id),
});

export const userFavoriteCommentsPrimaryKey = primaryKey({
  columns: [userFavoriteComments.userId, userFavoriteComments.commentId],
});

// Post-Tag many-to-many relationship table
export const postTags = pgTable('_PostToTag', {
  postId: uuid('A')
    .notNull()
    .references(() => posts.id),
  tagId: uuid('B')
    .notNull()
    .references(() => tags.id),
});

export const postTagsPrimaryKey = primaryKey({
  columns: [postTags.postId, postTags.tagId],
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  followedBy: many(follows, { relationName: 'following' }),
  following: many(follows, { relationName: 'follower' }),
  comments: many(comments),
  favoritedComments: many(userFavoriteComments),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  tags: many(postTags),
  comments: many(comments),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: 'follower',
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: 'following',
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  favoriteBy: many(userFavoriteComments),
}));

export const userFavoriteCommentsRelations = relations(
  userFavoriteComments,
  ({ one }) => ({
    user: one(users, {
      fields: [userFavoriteComments.userId],
      references: [users.id],
    }),
    comment: one(comments, {
      fields: [userFavoriteComments.commentId],
      references: [comments.id],
    }),
  }),
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
