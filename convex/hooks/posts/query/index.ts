import { query } from '../../../_generated/server';

export const getFeedPost = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized user');
    const currentUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();
    if (!currentUser) throw new Error('User Not Found');

    const posts = await ctx.db.query('posts').order('desc').collect();

    if (posts.length === 0) return [];

    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        const postAuthor = (await ctx.db.get(post.userId))!;
        const likes = await ctx.db
          .query('likes')
          .withIndex('by_user_and_post', (q) =>
            q.eq('userId', currentUser._id).eq('postId', post._id)
          )
          .first();
        const bookmarks = await ctx.db
          .query('bookmarks')
          .withIndex('by_user_and_post', (q) =>
            q.eq('userId', currentUser._id).eq('postId', post._id)
          )
          .first();
        return {
          ...post,
          author: {
            _id: postAuthor?._id,
            username: postAuthor?.username,
            image: postAuthor?.image,
          },
          isLiked: !!likes,
          isBookmarked: !!bookmarks,
        };
      })
    );
    return postsWithInfo;
  },
});
