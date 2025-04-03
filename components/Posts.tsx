import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/styles/feed/feed.styles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Post } from '@/types/posts';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/theme';

export default function Posts({ posts }: { posts: Post }) {
  return (
    <View style={styles.post}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Link href="/(tabs)/profile">
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={posts.imageUrl}
              style={styles.postAvatar}
              transition={200}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
            <Text style={styles.postUsername}>{posts.author}</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
          {/* <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} /> */}
        </TouchableOpacity>
      </View>
      {/* Post Image */}
      <Image
        source={posts.imageUrl}
        style={styles.postImage}
        transition={200}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
          <TouchableOpacity></TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {/* Post Info */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the first to like</Text>
        {posts.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{posts.author}</Text>
            <Text style={styles.captionText}>{posts.caption}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.commentsText}>View All Comments</TouchableOpacity>
        <Text style={styles.timeAgo}>2 hours ago</Text>
      </View>
    </View>
  );
}
