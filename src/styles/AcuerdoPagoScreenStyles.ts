import { StyleSheet, Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Styles {
  safeArea: ViewStyle;
  backgroundImage: ImageStyle;
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  title: TextStyle;
  spacer: ViewStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  scrollView: ViewStyle;
  listContainer: ViewStyle;
  summaryHeader: ViewStyle;
  summaryTitle: TextStyle;
  summarySubtitle: TextStyle;
  searchContainer: ViewStyle;
  searchInput: TextStyle;
  clearButton: ViewStyle;
  clearButtonText: TextStyle;
  listContent: ViewStyle;
  agreementCard: ViewStyle;
  cardHeader: ViewStyle;
  cardTitle: TextStyle;
  infoSection: ViewStyle;
  infoRow: ViewStyle;
  infoRowColumn: ViewStyle;
  infoLabel: TextStyle;
  infoValue: TextStyle;
  infoValueDescription: TextStyle;
  infoValueAmount: TextStyle;
  divider: ViewStyle;
  refreshButton: ViewStyle;
  refreshButtonText: TextStyle;
  emptyContainer: ViewStyle;
  emptyText: TextStyle;
  emptySubtext: TextStyle;
  retryButton: ViewStyle;
  retryButtonText: TextStyle;
  tabBar: ViewStyle;
  tabItem: ViewStyle;
  tabLabel: TextStyle;
  activeTab: TextStyle;
  accordionContainer: ViewStyle;
  accordionHeader: ViewStyle;
  accordionHeaderExpanded: ViewStyle;
  accordionHeaderLeft: ViewStyle;
  accordionIcon: ViewStyle;
  accordionHeaderText: ViewStyle;
  accordionTitle: TextStyle;
  accordionSubtitle: TextStyle;
  accordionStatus: TextStyle;
  accordionContent: ViewStyle;
  agreementSection: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  sectionContent: ViewStyle;
}

export default StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#01763C',
    textAlign: 'center',
    flex: 1,
  },
  spacer: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 260,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#01763C',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  summaryHeader: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#01763C',
    marginBottom: 5,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#01763C',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8ECEF',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#01763C',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  clearButton: {
    marginLeft: 8,
    backgroundColor: '#01763C',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 260,
  },
  agreementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#01763C',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#01763C',
    marginLeft: 12,
    flex: 1,
  },
  infoSection: {
    gap: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoRowColumn: {
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#01763C',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01763C',
    flex: 2,
    textAlign: 'right',
  },
  infoValueDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#01763C',
    marginTop: 8,
    lineHeight: 22,
    textAlign: 'justify',
  },
  infoValueAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01763C',
    flex: 2,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8ECEF',
    marginVertical: 5,
  },
  refreshButton: {
    backgroundColor: '#01763C',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 260,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#01763C',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#01763C',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#01763C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 5,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#01763C',
    marginTop: 16,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  activeTab: {
    color: '#01763C',
    fontWeight: '700',
  },
  // Estilos para acordeones
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  accordionHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
    backgroundColor: '#F8F9FA',
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accordionHeaderText: {
    flex: 1,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01763C',
    marginBottom: 4,
  },
  accordionSubtitle: {
    fontSize: 14,
    color: '#01763C',
    marginBottom: 4,
  },
  accordionStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#01763C',
    textTransform: 'uppercase',
  },
  accordionContent: {
    padding: 16,
    paddingTop: 0,
  },
  agreementSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01763C',
    marginLeft: 8,
  },
  sectionContent: {
    gap: 10,
  },
});
