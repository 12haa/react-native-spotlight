import Loader from '@/components/Loader';
import Posts from '@/components/Posts';
import StoryPage from '@/components/stoty';
import { mockUsers } from '@/constants/mockUserData';
import COLORS from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed/feed.styles';
import { Post } from '@/types/posts';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { signOut } = useAuth();

  // Fetching Posts
  const posts = useQuery(api.hooks.posts.query.index.getFeedPost);

  if (posts === undefined) return <Loader />;
  if (posts.length === 0) return <NoPostsFound />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} horizontal style={styles.storiesContainer}>
          {/* Feed */}
          {mockUsers.map((user) => (
            <StoryPage key={user.id} story={user} />
          ))}
        </ScrollView>
        {posts.map((post) => (
          <Posts post={post as any} key={post._id} />
        ))}
      </ScrollView>
    </View>
  );
}

function NoPostsFound() {
  return (
    <View>
      <Text>No Post Were Found</Text>
    </View>
  );
}
