import { v } from 'convex/values';
import { mutation } from '../../../_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('Unauthorized');
  }
  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    caption: v.optional(v.string()),
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }
    const clerkId = identity.subject;
    const currentUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', clerkId))
      .first();

    if (!currentUser) throw new Error('User Not Found!');
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) throw new Error('No Image URL FOund');

    const postId = await ctx.db.insert('posts', {
      userId: currentUser._id,
      imageUrl,
      storageId: args.storageId,
      caption: args.caption,
      author: currentUser.username,
      likes: 0,
      comments: 0,
    });

    await ctx.db.patch(currentUser._id, {
      posts: currentUser.posts + 1,
    });
    return postId;
  },
});

export const toggleLike = mutation({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized user');
    const currentUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();
    if (!currentUser) throw new Error('User Not Found');
    const existing = await ctx.db
      .query('likes')
      .withIndex('by_user_and_post', (q) =>
        q.eq('userId', currentUser._id).eq('postId', args.postId)
      )
      .first();
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error('Post Not Found');
    if (existing) {
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.postId, { likes: post.likes - 1 });
      return false;
    } else {
      await ctx.db.insert('likes', { userId: currentUser._id, postId: args.postId });
      await ctx.db.patch(args.postId, { likes: post.likes + 1 });

      // send Notif
      if (currentUser._id !== post.userId) {
        await ctx.db.insert('notifications', {
          receiverId: post.userId,
          senderId: currentUser._id,
          type: 'like',
          postId: args.postId,
        });
      }
      return true;
    }
  },
});
