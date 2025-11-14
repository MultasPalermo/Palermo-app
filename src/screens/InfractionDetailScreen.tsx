import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/InfractionDetailScreenStyles';
import useInfractionDetail from '../hooks/useInfractionDetail';
import { DetalleInfraccionScreenProps, InfoMultaItem } from '../types/navigation';
import { PaymentButton } from './PaymentButton';

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

  // Extraer datos para el pago
  const userInfractionId = infraccionFromRoute?.id ?
    (typeof infraccionFromRoute.id === 'number' ? infraccionFromRoute.id : parseInt(String(infraccionFromRoute.id), 10)) :
    0;

  const amount = infraccionFromRoute?.amountToPay ??
    infraccionFromRoute?.valor ??
    infraccionFromRoute?.amount ??
    infraccionFromRoute?.monto ??
    0;

  const numericAmount = typeof amount === 'number' ? amount : parseFloat(String(amount)) || 0;

  // DEBUG: Ver qué valores tenemos
  console.log('🔍 DEBUG PAGO:', {
    infraccionFromRoute,
    userInfractionId,
    amount,
    numericAmount,
    hasId: userInfractionId > 0,
    hasAmount: numericAmount > 0,
  });

  // Verificar si se puede pagar (tiene ID y monto válido)
  const canPay = userInfractionId > 0 && numericAmount > 0;

  console.log('💳 Puede pagar:', canPay);

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

          {/* Botón de Pago con MercadoPago */}
          {/* TEMPORAL: Siempre visible para debugging */}
          <View style={{ marginTop: 24, marginBottom: 40 }}>
            {canPay ? (
              <PaymentButton
                userInfractionId={userInfractionId}
                amount={numericAmount}
                useSandbox={true}
                onPaymentInitiated={() => {
                  console.log('Iniciando pago para infracción:', userInfractionId);
                }}
                onPaymentCompleted={() => {
                  Alert.alert(
                    'Pago Iniciado',
                    'Se ha abierto MercadoPago. Una vez completado el pago, podrás verificar el estado en tu historial.',
                    [
                      {
                        text: 'Entendido',
                        onPress: () => navigation.goBack(),
                      },
                    ]
                  );
                }}
              />
            ) : (
              <View style={{ padding: 16, backgroundColor: '#FFE5E5', borderRadius: 8 }}>
                <Text style={{ color: '#CC0000', fontSize: 14, textAlign: 'center' }}>
                  ⚠️ Botón de pago oculto
                </Text>
                <Text style={{ color: '#666', fontSize: 12, marginTop: 8, textAlign: 'center' }}>
                  ID: {userInfractionId || 'Sin ID'} | Monto: ${numericAmount || '0'}
                </Text>
                <Text style={{ color: '#666', fontSize: 10, marginTop: 4, textAlign: 'center' }}>
                  Revisa la consola para más detalles
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InfractionDetailScreen;
