import { Pressable, type PressableProps, type StyleProp, type ViewStyle, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPressableProps = PressableProps & {
  darkColor?: string;
  lightColor?: string;
  size?: 'default' | 'small' | 'large';
  // styleOverrides?: 'any';
  text: string;
  type?: 'default' | 'round' | 'link';
  style?: StyleProp<ViewStyle>
};

export function ThemedPressable({
  darkColor,
  lightColor,
  size = 'default',
  style,
  text,
  type = 'default',
  ...rest
}: ThemedPressableProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Pressable
      style={[
        type === 'default' && styles.default,
        type === 'link' && styles.link,
        type === 'round' && styles.round,
        style
      ]}
        {...rest}
    >
      <ThemedText
        style={[
          { color },
          type === 'default' && styles.default,
          type === 'link' && styles.link,
          type === 'round' && styles.round,
          style,
        ]}
        >{text}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#000',
    borderRadius: 12,
    color: '#FFF',
    fontSize: 16,
    // lineHeight: 24,
    padding: 10,
    textAlign: 'center',
  },
  link: {
    backgroundColor: 'blue',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  round: {
    backgroundColor: 'red',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
