/**
 * Represents a post in the application
 */
export type Post = {
  /** Timestamp when the post was created */

  post: {
    _creationTime: number;
    /** Unique identifier for the post */
    _id: string;
    /** Caption or description of the post */
    caption: string | undefined;
    /** Number of comments on the post */
    comments: number;
    /** URL to the post image */
    imageUrl: string;
    /** Number of likes on the post */
    likes: number;
    /** Storage identifier for the post image */
    storageId: string;
    /** User identifier of the post creator */
    userId: string;
   
    isLiked: boolean;
    isBookmarked: boolean;
    author: {
      _id: string | undefined;
      username: string | undefined;
      image: string | undefined;
    };
  };
};
