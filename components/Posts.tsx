import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/styles/feed/feed.styles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Post } from '@/types/posts';

export default function Posts({ posts }: { posts: Post }) {
  console.log(posts);
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
      </View>
    </View>
  );
}
