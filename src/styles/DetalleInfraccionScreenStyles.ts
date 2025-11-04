import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  absoluteBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  curveBg: {
    flex: 1,
    width: '100%',
    height: '140%',
  },
  gradientBg: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  backBtn: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#01763C',
    marginBottom: 15,
    textAlign: 'left',
  },
  seccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#01763C',
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  consulta: {
    fontSize: 14,
    color: '#01763C',
    marginBottom: 10,
    textAlign: 'left',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIcon: {
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#01763C',
  },
  cardDesc: {
    fontSize: 13,
    color: '#01763C',
    marginTop: 2,
  },
});

export default styles;
