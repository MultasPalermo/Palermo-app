import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/CoexistenceCodeScreenStyles';
import BackButton from '../components/BackButton';
import useCoexistenceCode from '../hooks/useCoexistenceCode';

interface CodigoConvivenciaScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const CoexistenceCodeScreen: React.FC<CodigoConvivenciaScreenProps> = ({ navigation }) => {
  const { query, setQuery, filteredLeyes, resetTimer } = useCoexistenceCode(navigation);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../img/curva-perfil.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.container}>
                <BackButton style={{ alignSelf: 'flex-start', marginBottom: 10 }} onPress={() => navigation.goBack()} />
            <Text style={styles.titulo}>Código de Convivencia {'  '}
              <Ionicons name="people-outline" size={20} color="#01763C" />
            </Text>
            <TextInput
              style={[styles.searchBar, { marginTop: 12 }]}
              placeholder="Consulta tu ley"
              placeholderTextColor="#6B9080"
              value={query}
              onChangeText={text => setQuery(text)}
              onFocus={resetTimer}
            />
            <FlatList
              data={filteredLeyes}
              keyExtractor={item => item.id}
              maxToRenderPerBatch={10}
              windowSize={5}
              initialNumToRender={10}
              removeClippedSubviews={true}
              updateCellsBatchingPeriod={50}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('LawDetail', { ley: item })}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name="document-text-outline" size={28} color="#01763C" />
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.leyTitulo}>{item.titulo}</Text>
                    <Text style={styles.leyDesc}>{item.descripcion}</Text>
                  </View>
                      <Ionicons name="chevron-forward" size={20} color="#01763C" />
                </TouchableOpacity>
              )}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CoexistenceCodeScreen;
