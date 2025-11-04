import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MultasResultadoScreenStyles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import useMultasResultado from '../hooks/useMultasResultado';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Multa {
  id: number;
  typeInfractionName?: string;
  observations?: string;
  firstName?: string;
  lastName?: string;
  dateInfraction?: string;
  date?: string;
  value?: number;
  amount?: number;
  total?: number;
}

interface RouteParams {
  [key: string]: any;
}

const MultasResultadoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const {
    displayName,
    docNumber,
    query,
    setQuery,
    onQueryChange,
    filteredMultas,
    selectedIds,
    toggleSelect,
    resetTimer,
    formatCurrency,
    resumen,
  } = useMultasResultado(navigation, route);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <ImageBackground
        source={require('../img/curva-perfil.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <TextInput
              style={styles.searchBar}
              placeholder="Consulta tus infracciones"
              placeholderTextColor="#6B9080"
              value={query}
              onChangeText={onQueryChange}
              onFocus={resetTimer}
            />
            <Text style={styles.title}>Infracciones</Text>
            <View style={styles.summaryCard}>
              {(() => {
                const r = resumen(filteredMultas);
                return (
                  <>
                    <Text style={styles.summaryTitle}>Resumen Estado de cuenta</Text>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Infracciones: {r.count}</Text>
                      {/* El total puede no estar disponible en la API; mostramos si existe */}
                      {r.total > 0 ? <Text style={styles.summaryTotal}>{formatCurrency(r.total)}</Text> : null}
                    </View>
                    <View style={styles.summaryMeta}>
                      <Text style={styles.metaText}>{displayName || 'Nombre no disponible'}</Text>
                      <Text style={styles.metaText}>Número de documento: {docNumber || 'N/A'}</Text>
                    </View>
                  </>
                );
              })()}
            </View>

            {/* Toggle de 'Comparendos y Multas' y 'Acuerdos de pago' eliminado por requerimiento */}

            <FlatList
              data={filteredMultas}
              keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
              contentContainerStyle={{ paddingBottom: 260 }}
              renderItem={({ item }) => {
                const selected = selectedIds.includes(item.id);
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.card}
                      activeOpacity={0.9}
                      onPress={() => toggleSelect(item.id)}
                    >
                      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.checkboxContainer}>
                        <Ionicons name={selected ? 'checkbox' : 'square-outline'} size={22} color={selected ? '#fff' : '#01763C'} style={selected ? styles.checkboxSelected : undefined} />
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <Ionicons name="document-text-outline" size={28} color="#01763C" />
                      </View>
                      <View style={styles.infoContainer}>
                        <Text style={styles.tipo}>{item.typeInfractionName || 'Tipo'}</Text>
                        <Text style={styles.descripcion} numberOfLines={2} ellipsizeMode='tail'>{item.observations || ''}</Text>
                        <Text style={[styles.metaText, { marginTop: 6 }]} numberOfLines={1} ellipsizeMode='tail'>{(item.firstName || item.lastName) ? `${item.firstName || ''} ${item.lastName || ''}`.trim() : ''}</Text>
                      </View>
                      {/* No mostramos precios: solo datos informativos */}
                    </TouchableOpacity>
                    {selected ? (
                      <View style={styles.detailBox}>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Fecha</Text><Text style={styles.detailValue}>{item.dateInfraction || item.date || ''}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Tipo</Text><Text style={styles.detailValue}>{item.typeInfractionName || ''}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Descripcion</Text><Text style={styles.detailValue}>{item.observations || ''}</Text></View>
                        <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
                          <TouchableOpacity style={styles.verMasButton} onPress={() => navigation.navigate('DetalleInfraccion', { infraccion: item })}>
                            <Text style={styles.verMasText}>Ver más</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                );
              }}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No se encontraron multas.</Text>}
            />
          </View>
        </SafeAreaView>
        {/* Botón VER RESUMEN eliminado por requerimiento */}

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="list-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Infracción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CodigoConvivencia')}>
            <Ionicons name="book-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Código de Convivencia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AcuerdoPago')}>
            <Ionicons name="card-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Acuerdo de Pago</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default MultasResultadoScreen;

// Extra: calcular total de seleccionadas
export function calcularTotalSeleccionadas(multas: Multa[] = [], selectedIds: number[] = []): number {
  return (multas || []).reduce((acc, it) => {
    if (selectedIds.includes(it.id)) {
      const price = Number(it.value ?? it.amount ?? it.total ?? 0);
      acc += isNaN(price) ? 0 : price;
    }
    return acc;
  }, 0);
}
