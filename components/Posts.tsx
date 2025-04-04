import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from '@/styles/feed/feed.styles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Post } from '@/types/posts';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/theme';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Posts({ post }: Post) {
  console.log('🚀 ~ Posts ~ posts:', post);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const toggleLike = useMutation(api.hooks.posts.mutation.index.toggleLike);
  const handleLike = async () => {
    try {
      const newIsLiked = await toggleLike({ postId: post._id as any });
      setIsLiked(newIsLiked);
      setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.post}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Link href="/(tabs)/profile">
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.imageUrl}
              style={styles.postAvatar}
              transition={200}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
          {/* <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} /> */}
        </TouchableOpacity>
      </View>
      {/* Post Image */}
      <Image
        source={post.imageUrl}
        style={styles.postImage}
        transition={200}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? COLORS.primary : COLORS.white}
              onPress={handleLike}
            />
          </TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {/* Post Info */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {likesCount > 0 ? `${likesCount.toLocaleString()} likes` : 'Be the first to like'}
        </Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.commentsText}>View All Comments</TouchableOpacity>
        <Text style={styles.timeAgo}>2 hours ago</Text>
      </View>
    </View>
  );
}
