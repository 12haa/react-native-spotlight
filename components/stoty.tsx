import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { styles } from '@/styles/feed/feed.styles';

type Story = {
  id: string;
  userName: string;
  avatar: string;
  hasStory: boolean;
};
const StoryPage = ({ story }: { story: Story }) => {
  console.log(story.avatar);
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} resizeMode="cover" />
      </View>
      <Text style={styles.storyUsername}>{story.userName}</Text>
    </TouchableOpacity>
  );
};

export default StoryPage;
