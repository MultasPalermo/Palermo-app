import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BackButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, size = 24, color = '#01763C', style }) => {
  // Evitar que el style pasado sobrescriba las propiedades visuales del botón
  // Extraemos sólo propiedades de layout/posición comunes que el usuario podría pasar
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const { margin, marginTop, marginBottom, marginLeft, marginRight, alignSelf, position, top, left, right, bottom } = flattenedStyle;

  const positioning: ViewStyle = { margin, marginTop, marginBottom, marginLeft, marginRight, alignSelf, position, top, left, right, bottom };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, positioning]}>
      <View style={styles.iconWrap}>
        <Ionicons name="arrow-back" size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;
