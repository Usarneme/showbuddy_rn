import { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedPressableProps extends PressableProps {
  children: ReactNode;
  darkColor?: string;
  lightColor?: string;
  size?: 'button' | 'small' | 'large';
  buttonStyle?: StyleProp<ViewStyle>,
  type?: 'button' | 'round' | 'link';
  rest?: 'any';
}

export function ThemedPressable({
  children,
  darkColor,
  lightColor,
  onPress,
  size = 'button',
  buttonStyle,
  type = 'button',
  ...rest
}: ThemedPressableProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Pressable
      style={[
        type === 'button' && styles.button,
        type === 'link' && styles.link,
        type === 'round' && styles.round,
        buttonStyle
      ]}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

const defaultStyles = {
  backgroundColor: 'rgba(10, 140, 240, 0.8)',
  borderRadius: 12,
  color: '#FFF',
  fontSize: 16,
  lineHeight: 24,
  padding: 10,
  textAlign: 'center',
};

const styles = StyleSheet.create({
  button: {
    ...defaultStyles,
  },
  link: {
    ...defaultStyles,
    backgroundColor: 'rgba(255,255,255,0.01)',
    color: 'cyan',
    fontSize: 32,
    lineHeight: 32,
    textDecorationLine: 'underline',
  },
  round: {
    ...defaultStyles,
    backgroundColor: 'orange',
    color: 'white',
    // borderRadius: 50,
    fontSize: 16,
    // lineHeight: 24,
    fontWeight: '600',
  },
});
