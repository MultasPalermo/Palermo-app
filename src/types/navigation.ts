/**
 * Centralized types for application navigation
 * Defines all Stack Navigator route parameters
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Shared data types
export interface FineInfoItem {
  icon: string;
  texto: string;
  valor: string;
}

export interface Infraction {
  id?: string | number;
  tipo?: string;
  typeInfractionName?: string;
  type?: string;
  descripcion?: string;
  observations?: string;
  description?: string;
  fechaTexto?: string;
  date?: string;
  dateInfraction?: string;
  fecha?: string;
  consulta?: string;
  infoMulta?: FineInfoItem[];
  monto?: string | number;
  valor?: number;
  amount?: number;
  amountToPay?: number;
  total?: number;
  fechaMax?: string;
  dueDate?: string;
  fecha_max?: string;
  number?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  userId?: string | number;
}

export interface Law {
  id: number;
  titulo: string;
  descripcion: string;
  numero: string;
  fecha: string;
}

export interface MinimumWageData {
  valor: number;
  anio: number;
  descripcion?: string;
}

// Route parameter definitions for each screen
export type RootStackParamList = {
  Welcome: undefined;
  Fines: undefined;
  FinesResult: {
    multas: Infraction[];
  };
  InfractionDetail: {
    infraccion: Infraction;
  };
  PaymentAgreement: undefined;
  CoexistenceCode: undefined;
  LawDetail: {
    ley: Law;
  };
  MinimumWageQuery: undefined;
  MinimumWageDetail: {
    smdlv: MinimumWageData;
  };
};

// Navigation types for each screen
export type WelcomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
export type FinesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Fines'>;
export type FinesResultNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FinesResult'>;
export type InfractionDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InfractionDetail'>;
export type PaymentAgreementNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PaymentAgreement'>;
export type CoexistenceCodeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CoexistenceCode'>;
export type LawDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LawDetail'>;
export type MinimumWageQueryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MinimumWageQuery'>;
export type MinimumWageDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MinimumWageDetail'>;

// Route types for each screen
export type WelcomeRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
export type FinesRouteProp = RouteProp<RootStackParamList, 'Fines'>;
export type FinesResultRouteProp = RouteProp<RootStackParamList, 'FinesResult'>;
export type InfractionDetailRouteProp = RouteProp<RootStackParamList, 'InfractionDetail'>;
export type PaymentAgreementRouteProp = RouteProp<RootStackParamList, 'PaymentAgreement'>;
export type CoexistenceCodeRouteProp = RouteProp<RootStackParamList, 'CoexistenceCode'>;
export type LawDetailRouteProp = RouteProp<RootStackParamList, 'LawDetail'>;
export type MinimumWageQueryRouteProp = RouteProp<RootStackParamList, 'MinimumWageQuery'>;
export type MinimumWageDetailRouteProp = RouteProp<RootStackParamList, 'MinimumWageDetail'>;

// Generic type for any navigation (useful in shared hooks)
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Legacy type aliases for backward compatibility (deprecated - use new English names)
/** @deprecated Use FinesNavigationProp instead */
export type MultasNavigationProp = FinesNavigationProp;
/** @deprecated Use FinesResultNavigationProp instead */
export type MultasResultadoNavigationProp = FinesResultNavigationProp;
/** @deprecated Use FinesResultRouteProp instead */
export type MultasResultadoRouteProp = FinesResultRouteProp;
/** @deprecated Use InfractionDetailScreenProps instead */
export type DetalleInfraccionScreenProps = InfractionDetailScreenProps;
/** @deprecated Use FineInfoItem instead */
export type InfoMultaItem = FineInfoItem;
/** @deprecated Use Infraction instead */
export type Infraccion = Infraction;

// Complete props for screen components
export interface WelcomeScreenProps {
  navigation: WelcomeNavigationProp;
  route: WelcomeRouteProp;
}

export interface FinesScreenProps {
  navigation: FinesNavigationProp;
  route: FinesRouteProp;
}

export interface FinesResultScreenProps {
  navigation: FinesResultNavigationProp;
  route: FinesResultRouteProp;
}

export interface InfractionDetailScreenProps {
  navigation: InfractionDetailNavigationProp;
  route: InfractionDetailRouteProp;
}

export interface PaymentAgreementScreenProps {
  navigation: PaymentAgreementNavigationProp;
  route: PaymentAgreementRouteProp;
}

export interface CoexistenceCodeScreenProps {
  navigation: CoexistenceCodeNavigationProp;
  route: CoexistenceCodeRouteProp;
}

export interface LawDetailScreenProps {
  navigation: LawDetailNavigationProp;
  route: LawDetailRouteProp;
}

export interface MinimumWageQueryScreenProps {
  navigation: MinimumWageQueryNavigationProp;
  route: MinimumWageQueryRouteProp;
}

export interface MinimumWageDetailScreenProps {
  navigation: MinimumWageDetailNavigationProp;
  route: MinimumWageDetailRouteProp;
}
