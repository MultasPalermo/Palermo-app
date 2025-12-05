import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Screen Props
export interface CodigoConvivenciaScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface ConsultaSmlvScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface AcuerdoPagoScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

// Law Detail Screen
export interface Ley {
  id: number;
  titulo: string;
  descripcion: string;
  textoCompleto: string;
  multa: string;
  articulos: string;
}

export interface RouteParamsLaw {
  ley: Ley;
}

export interface DetalleLeyScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: RouteParamsLaw }, 'params'>;
}

// Minimum Wage Detail Screen
export interface RouteParamsMinimumWage {
  smdlv?: number;
}

export interface DetalleSmlvScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: RouteParamsMinimumWage }, 'params'>;
}

// Component Props
export interface PaymentButtonProps {
  userInfractionId: number;
  amount: number;
  onPaymentInitiated?: () => void;
  onPaymentCompleted?: () => void;
}

export interface InstallmentPaymentButtonProps {
  agreementId: string | number;
  installmentNumber: number;
  amount: number;
  onPaymentInitiated?: () => void;
  onPaymentCompleted?: () => void;
}

export interface RenderAgreementItemProps {
  item: any;
  index: number;
}
