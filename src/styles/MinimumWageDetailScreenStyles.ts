import { StyleSheet } from 'react-native';

const DetalleSmlvScreenStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 4,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01763C',
    marginBottom: 10,
    textAlign: 'center',
  },
  seccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#01763C',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'left',
  },
  divider: {
    height: 1,
    backgroundColor: '#01763C',
    marginVertical: 10,
    opacity: 0.2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#01763C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    backgroundColor: '#01763C',
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
  },
  infoBox: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#01763C',
  },
  valueGreen: {
    fontSize: 15,
    color: '#38E078',
    fontWeight: 'bold',
    marginTop: 2,
  },
  valueBlue: {
    fontSize: 15,
    color: '#1ca3ec',
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default DetalleSmlvScreenStyles;
