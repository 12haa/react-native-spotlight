import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { styles } from '@/styles/create/create.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import * as FileSystem from 'expo-file-system';

export default function CreateScreen() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>('');
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };
  const generateUploadUrl = useMutation(api.hooks.posts.mutation.index.generateUploadUrl);
  const createPost = useMutation(api.hooks.posts.mutation.index.createPost);
  const handleShare = async () => {
    if (!isLoaded || !isSignedIn) {
      console.log('User not authenticated');
      return;
    }

    if (!selectedImage) return;

    try {
      setIsSharing(true);
      console.log('Generating upload URL...');
      const uploadUrl = await generateUploadUrl();
      console.log('Upload URL generated:', uploadUrl);

      console.log('Uploading image...');
      const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedImage, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        mimeType: 'image/jpeg',
      });
      console.log('Upload result status:', uploadResult.status);

      if (uploadResult.status !== 200) {
        console.error('Upload failed with status:', uploadResult.status);
        console.error('Response body:', uploadResult.body);
        throw new Error('Upload Failed');
      }

      const { storageId } = JSON.parse(uploadResult.body);
      console.log('Creating post with storageId:', storageId);
      await createPost({
        caption,
        storageId,
      });

      router.push('/(tabs)');
    } catch (error) {
      console.error('Error sharing post:', error);
      // Show error to user
      alert('Failed to share post: ' + (error || 'Unknown error'));
    } finally {
      setIsSharing(false);
    }
  };

  if (!selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post!</Text>
          <View style={{ width: 28 }} />
        </View>
        <TouchableOpacity style={styles.emptyImageContainer} onPress={pickImage}>
          <Ionicons name="image-outline" size={48} color={COLORS.grey} />
          <Text style={styles.emptyImageText}>Tap To Select Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            disabled={isSharing}
            onPress={() => {
              setCaption('');
              setSelectedImage(null);
            }}
          >
            <Ionicons
              name="close-outline"
              size={28}
              color={isSharing ? COLORS.grey : COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            style={[styles.shareButton, isSharing && styles.shareButtonDisabled]}
            disabled={isSharing || !selectedImage}
            onPress={handleShare}
          >
            {isSharing ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Text style={styles.shareText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          // contentOffset={{ x: 0, y: 100 }}
        >
          <View style={[styles.content, isSharing && styles.contentDisabled]}>
            <View style={styles.imageSection}>
              <Image
                source={selectedImage}
                style={styles.previewImage}
                contentFit="contain"
                transition={200}
              />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={pickImage}
                disabled={isSharing}
              >
                <Ionicons name="image-outline" size={20} color={COLORS.white} />
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input System */}
          <View style={styles.inputSection}>
            <View style={styles.captionContainer}>
              <Image
                source={user?.imageUrl}
                style={styles.userAvatar}
                contentFit="cover"
                transition={200}
              />
              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                placeholderTextColor={COLORS.grey}
                multiline
                value={caption}
                onChangeText={setCaption}
                editable={!isSharing}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
