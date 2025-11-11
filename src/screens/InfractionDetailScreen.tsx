import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/InfractionDetailScreenStyles';
import useInfractionDetail from '../hooks/useInfractionDetail';
import { DetalleInfraccionScreenProps, InfoMultaItem } from '../types/navigation';

interface InfraccionDisplay {
  tipo: string;
  descripcion: string;
  fechaTexto: string;
  consulta: string;
  infoMulta: InfoMultaItem[];
  monto: string;
  fechaMax: string;
}

const InfractionDetailScreen: React.FC<DetalleInfraccionScreenProps> = ({ navigation, route }) => {
  const infraccionFromRoute = route?.params?.infraccion;
  const { infraccion, resetTimer } = useInfractionDetail(navigation, infraccionFromRoute);

  // `infraccion` can be null when no data provided - provide a fallback shape
  const fallback: InfraccionDisplay = {
    tipo: 'No especificado',
    descripcion: 'Sin observaciones',
    fechaTexto: 'No especificada',
    consulta: 'SMDLV',
    infoMulta: [],
    monto: '-',
    fechaMax: '-',
  };
  const data = infraccion || fallback;

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1 }}>
        <View style={styles.absoluteBg}>
          <ImageBackground
            source={require('../img/curva-perfil.png')}
            style={styles.curveBg}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(1,118,60,0.7)", "#F6FFF8"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradientBg}
            />
          </ImageBackground>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BackButton style={styles.backBtn} onPress={() => navigation.goBack()} />
          <Text style={styles.titulo}>Detalle de Infracción</Text>
          <Text style={styles.seccion}>Infracción</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MinimumWageQuery')} activeOpacity={0.7}>
            <Text style={styles.consulta}>Consulta {data.consulta} <Ionicons name="help-circle-outline" size={16} color="#01763C" /></Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardIcon}><Ionicons name="document-text-outline" size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{data.tipo}</Text>
              <Text style={styles.cardDesc}>{data.descripcion}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardIcon}><Ionicons name="calendar-outline" size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Día y hora</Text>
              <Text style={styles.cardDesc}>{data.fechaTexto}</Text>
            </View>
          </View>
          <Text style={styles.seccion}>Información de la multa</Text>
          {Array.isArray(data.infoMulta) && data.infoMulta.length > 0 ? (
            data.infoMulta.map((item, idx) => (
              <View style={styles.card} key={idx}>
                <View style={styles.cardIcon}><Ionicons name={item.icon as any} size={28} color="#01763C" /></View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.texto}</Text>
                  <Text style={styles.cardDesc}>{item.valor}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.card}>
              <View style={styles.cardIcon}><Ionicons name="information-circle-outline" size={28} color="#01763C" /></View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Sin información</Text>
                <Text style={styles.cardDesc}>No hay datos adicionales sobre la multa.</Text>
              </View>
            </View>
          )}
          <Text style={styles.seccion}>Monto y fecha máxima</Text>
          <View style={styles.card}>
            <View style={styles.cardIcon}><Ionicons name="cash-outline" size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Monto a pagar</Text>
              <Text style={styles.cardDesc}>{data.monto}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardIcon}><Ionicons name="calendar-outline" size={28} color="#01763C" /></View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Fecha máxima de pago</Text>
              <Text style={styles.cardDesc}>{data.fechaMax}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InfractionDetailScreen;
