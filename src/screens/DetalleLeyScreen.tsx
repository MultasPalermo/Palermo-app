import React from 'react';
import { View, Text, ScrollView, ImageBackground, Pressable } from 'react-native';
import styles from '../styles/DetalleLeyScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import useDetalleLey from '../hooks/useDetalleLey';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

interface Ley {
  titulo: string;
  descripcion: string;
  textoCompleto: string;
  multa: string | null;
  articulos: string | null;
}

interface RouteParams {
  ley?: Ley;
}

interface DetalleLeyScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: RouteParams }, 'params'>;
}

const DetalleLeyScreen: React.FC<DetalleLeyScreenProps> = ({ navigation, route }) => {
  const leyFromRoute = route?.params?.ley;
  const { ley: leyFormatted, resetTimer } = useDetalleLey(navigation, leyFromRoute);
  const ley = leyFormatted || { titulo: '', descripcion: '', textoCompleto: '', multa: null, articulos: null };

  return (
    <Pressable onPress={resetTimer} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.container}>
            <BackButton style={styles.backButton} onPress={() => navigation.goBack()} />

            <View style={styles.headerContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text" size={32} color="#01763C" />
              </View>
              <Text style={styles.titulo}>{ley.titulo}</Text>
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentCard}>
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.descripcion}>{ley.descripcion}</Text>

                <Text style={styles.sectionTitle}>Texto Completo de la Ley</Text>
                <Text style={styles.textoCompleto}>{ley.textoCompleto}</Text>

                {ley.multa && (
                  <>
                    <Text style={styles.sectionTitle}>Multa</Text>
                    <Text style={styles.multa}>{ley.multa}</Text>
                  </>
                )}

                {ley.articulos && (
                  <>
                    <Text style={styles.sectionTitle}>Artículos Relacionados</Text>
                    <Text style={styles.articulos}>{ley.articulos}</Text>
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default DetalleLeyScreen;
