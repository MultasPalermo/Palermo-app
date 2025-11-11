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

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { resetTimer } = useInactivity(navigation, 'Welcome');

  const handleLoginPress = () => {
    navigation.navigate('Fines');
  };

  // Detects any touch on the screen to reset the timer
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
                Bienvenido a{"\n"}nuestra aplicación
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

export default WelcomeScreen;
