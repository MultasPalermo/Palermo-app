import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import styles from '../styles/ConsultaSmlvScreenStyles';
import useConsultaSmlv from '../hooks/useConsultaSmlv';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Multa {
  id: string;
  nombre: string;
  smdlv: number;
}

interface ConsultaSmlvScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ConsultaSmlvScreen: React.FC<ConsultaSmlvScreenProps> = ({ navigation }) => {
  const { multas, resetTimer } = useConsultaSmlv(navigation);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <BackButton style={styles.backBtn} onPress={() => navigation.goBack()} />
            <Text style={styles.titulo}>Consulta Smlv</Text>
            {Array.isArray(multas) && multas.length > 0 ? (
              multas.map((multa) => (
                <TouchableOpacity
                  key={multa.id}
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('DetalleSmlv', { smdlv: multa.smdlv });
                  }}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={48}
                    color="#4A90E2"
                    style={{ marginRight: 18 }}
                  />
                  <Text style={styles.cardText}>{multa.nombre}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="document-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>No se encontraron multas</Text>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ConsultaSmlvScreen;
