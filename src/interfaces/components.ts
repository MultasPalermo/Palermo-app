import { ViewStyle } from 'react-native';

export interface BackButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
}
