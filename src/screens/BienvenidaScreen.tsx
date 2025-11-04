import React from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/AppStyles';
import useInactivity from '../hooks/useInactivity';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BienvenidaScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const BienvenidaScreen: React.FC<BienvenidaScreenProps> = ({ navigation }) => {
  const { resetTimer } = useInactivity(navigation, 'Bienvenida');

  const handleLoginPress = () => {
    navigation.navigate('Multas');
  };

  // Detecta cualquier toque en la pantalla para reiniciar el temporizador
  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <ImageBackground
          source={{ uri: 'https://palermohuila.wordpress.com/wp-content/uploads/2012/08/n.jpg' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                Bienvenido a{"\n"}nuestro aplicativo
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginPress}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BienvenidaScreen;
