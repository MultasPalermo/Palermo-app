
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import FinesScreen from './src/screens/FinesScreen';
import FinesResultScreen from './src/screens/FinesResultScreen';
import PaymentAgreementScreen from './src/screens/PaymentAgreementScreen';
import InfractionDetailScreen from './src/screens/InfractionDetailScreen';
import MinimumWageDetailScreen from './src/screens/MinimumWageDetailScreen';
import CoexistenceCodeScreen from './src/screens/CoexistenceCodeScreen';
import LawDetailScreen from './src/screens/LawDetailScreen';
import MinimumWageQueryScreen from './src/screens/MinimumWageQueryScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Fines" component={FinesScreen} />
        <Stack.Screen name="FinesResult" component={FinesResultScreen} />
        <Stack.Screen name="PaymentAgreement" component={PaymentAgreementScreen} />
        <Stack.Screen name="InfractionDetail" component={InfractionDetailScreen} />
        <Stack.Screen name="MinimumWageQuery" component={MinimumWageQueryScreen} />
        <Stack.Screen name="MinimumWageDetail" component={MinimumWageDetailScreen} />
        <Stack.Screen name="CoexistenceCode" component={CoexistenceCodeScreen} />
        <Stack.Screen name="LawDetail" component={LawDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
