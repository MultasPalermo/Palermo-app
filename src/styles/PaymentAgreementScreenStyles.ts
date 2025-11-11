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
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingTop: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#01763C',
    textAlign: 'center',
    flex: 1,
    letterSpacing: 0.3,
  },
  spacer: {
    width: 44,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 260,
  },
  loadingText: {
    marginTop: 18,
    fontSize: 17,
    color: '#01763C',
    textAlign: 'center',
    fontWeight: '500',
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
    backgroundColor: 'rgba(1, 118, 60, 0.08)',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#01763C',
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#01763C',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  summarySubtitle: {
    fontSize: 15,
    color: '#01763C',
    fontWeight: '600',
    opacity: 0.85,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#01763C',
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontWeight: '500',
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: '#01763C',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  listContent: {
    paddingBottom: 260,
  },
  agreementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 18,
    padding: 22,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    borderLeftWidth: 6,
    borderLeftColor: '#01763C',
    borderWidth: 1,
    borderColor: 'rgba(1, 118, 60, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    paddingBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(1, 118, 60, 0.1)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#01763C',
    marginLeft: 14,
    flex: 1,
    letterSpacing: 0.2,
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  infoRowColumn: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#01763C',
    flex: 1,
    opacity: 0.8,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#01763C',
    flex: 2,
    textAlign: 'right',
  },
  infoValueDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#01763C',
    marginTop: 10,
    lineHeight: 24,
    textAlign: 'justify',
    opacity: 0.9,
  },
  infoValueAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#01763C',
    flex: 2,
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(1, 118, 60, 0.15)',
    marginVertical: 8,
  },
  refreshButton: {
    backgroundColor: '#01763C',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 260,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#01763C',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 26,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#01763C',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  retryButton: {
    backgroundColor: '#01763C',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 24,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    zIndex: 5,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#01763C',
    marginTop: 18,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
    fontWeight: '600',
  },
  activeTab: {
    color: '#01763C',
    fontWeight: '800',
  },
  // Estilos para acordeones
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(1, 118, 60, 0.1)',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  accordionHeaderExpanded: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(1, 118, 60, 0.15)',
    backgroundColor: 'rgba(1, 118, 60, 0.04)',
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#01763C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accordionHeaderText: {
    flex: 1,
  },
  accordionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#01763C',
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  accordionSubtitle: {
    fontSize: 15,
    color: '#01763C',
    marginBottom: 5,
    fontWeight: '600',
    opacity: 0.85,
  },
  accordionStatus: {
    fontSize: 13,
    fontWeight: '700',
    color: '#01763C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accordionContent: {
    padding: 18,
    paddingTop: 4,
  },
  agreementSection: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(1, 118, 60, 0.15)',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#01763C',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  sectionContent: {
    gap: 12,
  },
});
