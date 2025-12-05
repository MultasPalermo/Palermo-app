/**
 * Estilos para el modal de selección de cuota
 */

import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ModalStyles {
  overlay: ViewStyle;
  modal: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  infoText: TextStyle;
  input: TextStyle;
  inputError: TextStyle;
  errorText: TextStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  buttonCancel: ViewStyle;
  buttonConfirm: ViewStyle;
  buttonTextCancel: TextStyle;
  buttonTextConfirm: TextStyle;
}

export default StyleSheet.create<ModalStyles>({
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
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#01763C',
    marginBottom: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#F44336',
    borderWidth: 2,
  },
  errorText: {
    color: '#F44336',
    fontSize: 13,
    marginBottom: 12,
    marginTop: 4,
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
