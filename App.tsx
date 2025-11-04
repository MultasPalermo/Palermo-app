
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import MultasScreen from './src/screens/MultasScreen';
import MultasResultadoScreen from './src/screens/MultasResultadoScreen';
import AcuerdoPagoScreen from './src/screens/AcuerdoPagoScreen';
import DetalleInfraccionScreen from './src/screens/DetalleInfraccionScreen';
import DetalleSmlvScreen from './src/screens/DetalleSmlvScreen';
import CodigoConvivenciaScreen from './src/screens/CodigoConvivenciaScreen';
import DetalleLeyScreen from './src/screens/DetalleLeyScreen';
import ConsultaSmlvScreen from './src/screens/ConsultaSmlvScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenida" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Stack.Screen name="Multas" component={MultasScreen} />
  <Stack.Screen name="MultasResultado" component={MultasResultadoScreen} />
  <Stack.Screen name="AcuerdoPago" component={AcuerdoPagoScreen} />
  <Stack.Screen name="DetalleInfraccion" component={DetalleInfraccionScreen} />
  <Stack.Screen name="ConsultaSmlv" component={ConsultaSmlvScreen} />
  <Stack.Screen name="DetalleSmlv" component={DetalleSmlvScreen} />
  <Stack.Screen name="CodigoConvivencia" component={CodigoConvivenciaScreen} />
  <Stack.Screen name="DetalleLey" component={DetalleLeyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
