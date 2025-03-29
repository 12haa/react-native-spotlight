import { getDefaultConfig } from 'expo/metro-config';
import type { MetroConfig } from 'metro-config';

const defaultConfig = getDefaultConfig(__dirname);

const config: MetroConfig = {
  ...defaultConfig,
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: (defaultConfig?.resolver?.assetExts || []).filter((ext) => ext !== 'svg'),
    sourceExts: [...(defaultConfig?.resolver?.sourceExts ?? []), 'svg'],
  },
};

export default config;
