import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import styles from '../styles/MinimumWageDetailScreenStyles';
import useMinimumWageDetail from '../hooks/useMinimumWageDetail';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

interface RouteParams {
  smdlv?: number;
}

interface DetalleSmlvScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: RouteParams }, 'params'>;
}

const MinimumWageDetailScreen: React.FC<DetalleSmlvScreenProps> = ({ navigation, route }) => {
  const smdlvFromRoute = route?.params?.smdlv;
  const { SALARIO_MINIMO, SMLDV, smdlv, valorSmdlv, valorTotal, formatos, resetTimer } = useMinimumWageDetail(navigation, smdlvFromRoute);

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
            <Text style={styles.titulo}>Detalle de Infracción</Text>
            <Text style={styles.seccion}>Infracción</Text>
            <View style={styles.divider} />
            <View style={styles.card}>
              <View style={styles.iconBox}><Ionicons name="list-outline" size={32} color="#fff" /></View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Número de SMDLV</Text>
                <Text style={styles.valueGreen}>{smdlv}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconBox}><Ionicons name="cash-outline" size={32} color="#fff" /></View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Salario mínimo vigente</Text>
                <Text style={styles.valueBlue}>{formatos.salarioTexto}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconBox}><Ionicons name="calculator-outline" size={32} color="#fff" /></View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Cálculo del SMDLV</Text>
                <Text style={styles.valueBlue}>{formatos.calculoSmdlvTexto}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconBox}><Ionicons name="pricetag-outline" size={32} color="#fff" /></View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Valor de un SMDLV</Text>
                <Text style={styles.valueGreen}>{formatos.valorSmdlvTexto}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconBox}><Ionicons name="calculator-outline" size={32} color="#fff" /></View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Calcular Valor De Multa</Text>
                <Text style={styles.valueBlue}>${formatos.valorSmdlvTexto} x {smdlv}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconBox}><Ionicons name="cash-outline" size={32} color="#fff" /></View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Valor Total de Multa</Text>
                <Text style={styles.valueGreen}>{formatos.valorTotalTexto}</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MinimumWageDetailScreen;
