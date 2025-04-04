import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
export default defineSchema({
  // Define your data model here.
  // See https://docs.convex.dev/database/schema for more.
  users: defineTable({
    username: v.string(),
    fullName: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
    followers: v.number(),
    following: v.number(),
    posts: v.number(),
    clerkId: v.string(),
  }).index('by_clerk_id', ['clerkId']),
  posts: defineTable({
    userId: v.id('users'),
    imageUrl: v.string(),
    storageId: v.id('_storage'),
    caption: v.optional(v.string()),
    likes: v.number(),
    comments: v.number(),
    author: v.string(),
  }).index('by_author', ['userId']),
  likes: defineTable({
    postId: v.id('posts'),
    userId: v.id('users'),
  })
    .index('by_post', ['postId'])
    .index('by_user_and_post', ['userId', 'postId']),

  follows: defineTable({
    followerId: v.id('users'),
    followingId: v.id('users'),
  })
    .index('by_follower', ['followerId'])
    .index('by_following', ['followingId'])
    .index('by_both', ['followerId', 'followingId']),
  notifications: defineTable({
    receiverId: v.id('users'),
    senderId: v.id('users'),
    type: v.union(v.literal('like'), v.literal('comment'), v.literal('follow')),
    postId: v.optional(v.id('posts')),
    commentId: v.optional(v.id('comments')),
  }).index('by_receiver', ['receiverId']),

  comments: defineTable({
    postId: v.id('posts'),
    userId: v.id('users'),
    content: v.string(),
  }).index('by_post', ['postId']),

  bookmarks: defineTable({
    userId: v.id('users'),
    postId: v.id('posts'),
  })
    .index('by_user', ['userId'])
    .index('by_post', ['postId'])
    .index('by_user_and_post', ['userId', 'postId']),
});
