import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, ImageBackground, ViewStyle, TextStyle, Alert, Modal, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import styles from '../styles/PaymentAgreementScreenStyles';
import usePaymentAgreements from '../hooks/usePaymentAgreements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InstallmentPaymentButton } from './InstallmentPaymentButton';

interface PaymentAgreement {
  id: string | number;
  personName?: string;
  documentNumber?: string;
  document?: string;
  phoneNumber?: string;
  address?: string;
  neighborhood?: string;
  typeFine?: string;
  infringement?: string;
  agreementStart?: string;
  agreementEnd?: string;
  paymentMethod?: string;
  installments?: number;
  baseAmount?: number;
  monthlyFee?: number;
  outstandingAmount?: number;
  isCoactive?: boolean;
  isPaid?: boolean;
  [key: string]: any;
}

interface AcuerdoPagoScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

interface RenderAgreementItemProps {
  item: PaymentAgreement;
  index: number;
}

const PaymentAgreementScreen: React.FC<AcuerdoPagoScreenProps> = ({ navigation }) => {
  const {
    loading,
    filteredData,
    query,
    setQuery,
    expandedItems,
    toggleExpanded,
    fetchPaymentAgreements,
    resetTimer,
    formatCurrency,
    formatDate,
  } = usePaymentAgreements(navigation);

  const [payingInstallments, setPayingInstallments] = useState<{[key: string]: number}>({});
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [currentAgreementId, setCurrentAgreementId] = useState<string | number | null>(null);
  const [installmentInput, setInstallmentInput] = useState('');

  const handlePayInstallment = (agreementId: string | number) => {
    console.log('🟢 [PaymentAgreementScreen] Abriendo modal para acuerdo:', agreementId);
    setCurrentAgreementId(agreementId);
    setInstallmentInput('');
    setShowInstallmentModal(true);
  };

  const handleConfirmInstallment = () => {
    console.log('🟢 [PaymentAgreementScreen] Confirmando cuota:', installmentInput);
    const installmentId = parseInt(installmentInput || '0', 10);
    if (installmentId > 0 && currentAgreementId) {
      setPayingInstallments(prev => ({ ...prev, [currentAgreementId]: installmentId }));
      setShowInstallmentModal(false);
      console.log('🟢 [PaymentAgreementScreen] Cuota configurada:', installmentId, 'para acuerdo:', currentAgreementId);
    } else {
      Alert.alert('Error', 'Por favor ingresa un número de cuota válido');
    }
  };

  const renderAgreementItem = ({ item, index }: RenderAgreementItemProps) => {
    const isExpanded = expandedItems[item.id] || false;
    const agreementNumber = index + 1;
    const payingInstallmentId = payingInstallments[item.id];

    return (
      <View style={styles.accordionContainer}>
        {/* Header del acordeón */}
        <TouchableOpacity
          style={[styles.accordionHeader, isExpanded && styles.accordionHeaderExpanded]}
          onPress={() => toggleExpanded(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={[styles.accordionIcon, { backgroundColor: item.isPaid ? '#4CAF50' : '#01763C' } as ViewStyle]}>
              <Ionicons
                name={item.isPaid ? "checkmark-circle" : "time"}
                size={24}
                color="#fff"
              />
            </View>
            <View style={styles.accordionHeaderText}>
              <Text style={styles.accordionTitle}>Acuerdo #{agreementNumber}</Text>
              <Text style={styles.accordionSubtitle}>
                {item.typeFine || 'Sin tipo'} • {formatCurrency(item.outstandingAmount || 0)}
              </Text>
              <Text style={styles.accordionStatus}>
                {item.isPaid ? 'Pagado' : 'Pendiente'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#6B9080"
          />
        </TouchableOpacity>

        {/* Contenido expandible */}
        {isExpanded && (
          <View style={styles.accordionContent}>
            {/* Información Personal */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={20} color="#01763C" />
                <Text style={styles.sectionTitle}>Información Personal</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Nombre:</Text>
                  <Text style={styles.infoValue}>{item.personName || 'No especificado'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Documento:</Text>
                  <Text style={styles.infoValue}>{item.documentNumber || item.document || 'No especificado'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Teléfono:</Text>
                  <Text style={styles.infoValue}>{item.phoneNumber || 'No especificado'}</Text>
                </View>
                <View style={styles.infoRowColumn}>
                  <Text style={styles.infoLabel}>Dirección:</Text>
                  <Text style={styles.infoValueDescription}>
                    {item.address || 'No especificada'}{item.neighborhood ? `, ${item.neighborhood}` : ''}
                  </Text>
                </View>
              </View>
            </View>

            {/* Detalles de la Infracción */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="warning-outline" size={20} color="#FF6B35" />
                <Text style={styles.sectionTitle}>Detalles de la Infracción</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tipo:</Text>
                  <Text style={styles.infoValue}>{item.typeFine || 'No especificado'}</Text>
                </View>
                <View style={styles.infoRowColumn}>
                  <Text style={styles.infoLabel}>Descripción:</Text>
                  <Text style={styles.infoValueDescription}>{item.infringement || 'No especificada'}</Text>
                </View>
              </View>
            </View>

            {/* Información del Acuerdo */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar-outline" size={20} color="#2196F3" />
                <Text style={styles.sectionTitle}>Detalles del Acuerdo</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vigencia:</Text>
                  <Text style={styles.infoValue}>{formatDate(item.agreementStart)} - {formatDate(item.agreementEnd)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Método de Pago:</Text>
                  <Text style={styles.infoValue}>{item.paymentMethod || 'No especificado'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cuotas:</Text>
                  <Text style={styles.infoValue}>{item.installments || 0}</Text>
                </View>
              </View>
            </View>

            {/* Información Financiera */}
            <View style={styles.agreementSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="cash-outline" size={20} color="#4CAF50" />
                <Text style={styles.sectionTitle}>Información Financiera</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Monto Base:</Text>
                  <Text style={styles.infoValueAmount}>{formatCurrency(item.baseAmount || 0)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cuota Mensual:</Text>
                  <Text style={styles.infoValueAmount}>{formatCurrency(item.monthlyFee || 0)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Saldo Pendiente:</Text>
                  <Text style={styles.infoValueAmount}>{formatCurrency(item.outstandingAmount || 0)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Proceso Coactivo:</Text>
                  <Text style={[styles.infoValue, { color: item.isCoactive ? '#F44336' : '#4CAF50' } as TextStyle]}>
                    {item.isCoactive ? 'Activo' : 'No Activo'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Botón de Pago de Cuota */}
            {!item.isPaid && (
              <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
                {payingInstallmentId ? (
                  <InstallmentPaymentButton
                    agreementId={Number(item.id)}
                    installmentId={payingInstallmentId}
                    amount={item.monthlyFee || 0}
                    onPaymentCompleted={() => {
                      setPayingInstallments(prev => {
                        const newState = { ...prev };
                        delete newState[item.id];
                        return newState;
                      });
                      Alert.alert(
                        'Pago Iniciado',
                        'Se ha abierto MercadoPago. Una vez completado el pago, podrás verificar el estado en tu historial.',
                        [{ text: 'Entendido' }]
                      );
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#01763C',
                      paddingVertical: 14,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={() => handlePayInstallment(item.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="card-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                      Pagar una Cuota
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../img/curva-perfil.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity activeOpacity={1} onPress={resetTimer} style={styles.container}>
          <View style={styles.header}>
            <BackButton style={styles.backButton} onPress={() => navigation.goBack()} />
            <Text style={styles.title}>Acuerdo de Pago</Text>
            <View style={styles.spacer} />
          </View>

          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Buscar por nombre, documento, tipo o descripción"
              placeholderTextColor="#888"
              style={styles.searchInput}
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                resetTimer();
              }}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {query.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setQuery('');
                  fetchPaymentAgreements();
                  resetTimer();
                }}
              >
                <Text style={styles.clearButtonText}>Limpiar</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#01763C" />
              <Text style={styles.loadingText}>Cargando acuerdos de pago...</Text>
            </View>
          ) : filteredData.length > 0 ? (
            <View style={styles.listContainer}>
              <View style={styles.summaryHeader}>
                <Text style={styles.summaryTitle}>Mis Acuerdos de Pago</Text>
                <Text style={styles.summarySubtitle}>
                  {filteredData.length} acuerdo{filteredData.length !== 1 ? 's' : ''} encontrado{filteredData.length !== 1 ? 's' : ''}
                </Text>
              </View>

              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={renderAgreementItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                maxToRenderPerBatch={8}
                windowSize={3}
                initialNumToRender={8}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={50}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No tienes acuerdos de pago registrados</Text>
              <Text style={styles.emptySubtext}>
                Los acuerdos de pago aparecerán aquí cuando tengas infracciones con acuerdos activos.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchPaymentAgreements}
              >
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        {/* tabBar dentro del SafeAreaView para que el fondo lo cubra */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FinesResult')}>
            <Ionicons name="list-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Infracción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CoexistenceCode')}>
            <Ionicons name="book-outline" size={24} color="#01763C" />
            <Text style={styles.tabLabel}>Código de Convivencia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="card-outline" size={24} color="#01763C" />
            <Text style={[styles.tabLabel, styles.activeTab]}>Acuerdo de Pago</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal para ingresar número de cuota */}
      <Modal
        visible={showInstallmentModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInstallmentModal(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modal}>
            <Text style={modalStyles.title}>Pagar Cuota</Text>
            <Text style={modalStyles.subtitle}>Ingresa el número de la cuota que deseas pagar:</Text>

            <TextInput
              style={modalStyles.input}
              value={installmentInput}
              onChangeText={setInstallmentInput}
              keyboardType="numeric"
              placeholder="Ej: 1, 2, 3..."
              autoFocus={true}
            />

            <View style={modalStyles.buttons}>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonCancel]}
                onPress={() => setShowInstallmentModal(false)}
              >
                <Text style={modalStyles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonConfirm]}
                onPress={handleConfirmInstallment}
              >
                <Text style={modalStyles.buttonTextConfirm}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#01763C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f0f0f0',
  },
  buttonConfirm: {
    backgroundColor: '#01763C',
  },
  buttonTextCancel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextConfirm: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentAgreementScreen;
