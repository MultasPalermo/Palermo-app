import { StyleSheet } from 'react-native';

const DetalleLeyScreenStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 4,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#E6F4EA',
    borderRadius: 50,
    padding: 16,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#01763C',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#01763C',
    marginTop: 20,
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#01763C',
    lineHeight: 24,
    marginBottom: 8,
  },
  textoCompleto: {
    fontSize: 15,
    color: '#01763C',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 8,
  },
  multa: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600',
    marginBottom: 8,
  },
  articulos: {
    fontSize: 15,
    color: '#01763C',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default DetalleLeyScreenStyles;
