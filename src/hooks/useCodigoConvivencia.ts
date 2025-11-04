import { useState, useMemo } from 'react';
import useInactivity from './useInactivity';

interface Ley {
  id: string;
  titulo: string;
  descripcion: string;
  textoCompleto: string;
  multa: string;
  articulos: string;
}

const defaultLeyes: Ley[] = [
  {
    id: '1',
    titulo: 'LEY 1801 DE 2016',
    descripcion: 'Amenazar con dañar físicamente a alguien.',
    textoCompleto: 'Por la cual se expide el Código Nacional de Policía y Convivencia. Esta ley establece que constituye comportamiento contrario a la convivencia amenazar con causar daño físico a otra persona, sus bienes o miembros de su familia. Este comportamiento atenta contra la integridad de las personas y genera un ambiente de inseguridad y temor en la comunidad.',
    multa: 'Multa de 4 a 8 salarios mínimos legales diarios vigentes (SMLDV)',
    articulos: 'Artículo 27. Comportamientos que afectan la tranquilidad y relaciones respetuosas de las personas.',
  },
  {
    id: '2',
    titulo: 'LEY 2318 DE 2023',
    descripcion: 'Restringir muestras de afecto no sexuales por discriminación.',
    textoCompleto: 'Por medio de la cual se modifica la Ley 1801 de 2016 "Código Nacional de Policía y Convivencia" en materia de diversidad sexual y de género. Esta ley prohíbe restringir o impedir las muestras de afecto no sexuales entre personas del mismo sexo o de géneros diversos en espacios públicos o privados de uso público por motivos discriminatorios.',
    multa: 'Multa de 8 a 16 salarios mínimos legales diarios vigentes (SMLDV)',
    articulos: 'Artículo 33-A. Comportamientos discriminatorios por razón de diversidad sexual y de género.',
  },
  {
    id: '3',
    titulo: 'LEY 2197 DE 2022',
    descripcion: 'Agredir físicamente a personas por cualquier medio.',
    textoCompleto: 'Ley que tipifica y sanciona la violencia contra servidores públicos. Establece como comportamiento contrario a la convivencia agredir físicamente a cualquier persona, incluyendo servidores públicos en ejercicio de sus funciones. La agresión física constituye una violación directa a la integridad personal y genera alteración del orden público.',
    multa: 'Multa de 16 a 32 salarios mínimos legales diarios vigentes (SMLDV)',
    articulos: 'Artículo 27. Comportamientos que afectan la integridad física de las personas.',
  },
  {
    id: '4',
    titulo: 'LEY 2054 DE 2022',
    descripcion: 'Usar o manejar pólvora sin cumplir la norma.',
    textoCompleto: 'Por medio de la cual se dictan normas para el control de artículos pirotécnicos y se dictan otras disposiciones. Establece que constituye comportamiento contrario a la convivencia usar, portar, almacenar o comercializar pólvora o artículos pirotécnicos sin cumplir con los requisitos legales establecidos, poniendo en riesgo la seguridad de las personas.',
    multa: 'Multa de 8 a 32 salarios mínimos legales diarios vigentes (SMLDV) y decomiso',
    articulos: 'Artículo 140. Comportamientos relacionados con pólvora y artículos pirotécnicos.',
  },
  {
    id: '5',
    titulo: 'LEY 1804 DE 2016',
    descripcion: 'Protección integral a la primera infancia (Ley de Cero a Siempre).',
    textoCompleto: 'Por la cual se establece la política de Estado para el desarrollo integral de la primera infancia de Cero a Siempre y se dictan otras disposiciones. Esta ley garantiza los derechos de los niños y niñas de 0 a 6 años, estableciendo la atención integral que incluye salud, nutrición, educación inicial y protección, reconociendo esta etapa como fundamental para el desarrollo humano.',
    multa: 'Las sanciones se establecen según el tipo de vulneración a los derechos del menor',
    articulos: 'Artículo 4. Principios de la atención integral. Artículo 7. Derechos de los niños y niñas.',
  },
  {
    id: '6',
    titulo: 'LEY 1257 DE 2008',
    descripcion: 'Medidas de protección contra la violencia hacia la mujer.',
    textoCompleto: 'Por la cual se dictan normas de sensibilización, prevención y sanción de formas de violencia y discriminación contra las mujeres. Esta ley establece medidas de protección integral para garantizar a las mujeres una vida libre de violencias, definiendo los tipos de violencia y estableciendo mecanismos para su prevención, atención y sanción.',
    multa: 'Las sanciones varían según el tipo de violencia, desde medidas de protección hasta penas privativas de la libertad',
    articulos: 'Artículo 7. Tipos de violencia. Artículo 17. Medidas de protección.',
  },
  {
    id: '7',
    titulo: 'LEY 1098 DE 2006',
    descripcion: 'Código de Infancia y Adolescencia.',
    textoCompleto: 'Por la cual se expide el Código de la Infancia y la Adolescencia. Esta ley tiene por objeto establecer normas sustantivas y procesales para la protección integral de los niños, las niñas y los adolescentes, garantizar el ejercicio de sus derechos y libertades consagrados en los instrumentos internacionales de derechos humanos.',
    multa: 'Las sanciones se establecen según el tipo de vulneración, incluyendo medidas pedagógicas, servicios a la comunidad y privación de la libertad',
    articulos: 'Artículo 17. Derecho a la vida y a la calidad de vida. Artículo 44. Derechos fundamentales.',
  },
  {
    id: '8',
    titulo: 'LEY 599 DE 2000',
    descripcion: 'Código Penal Colombiano.',
    textoCompleto: 'Por la cual se expide el Código Penal. Esta ley establece los principios y normas rectoras de la ley penal colombiana, tipifica las conductas que constituyen delitos y contravenciones, señala las penas y medidas de seguridad correspondientes, y regula lo relativo a la extinción de la acción penal y al cumplimiento de las penas.',
    multa: 'Las penas varían según el tipo de delito, desde multas hasta prisión de varios años',
    articulos: 'Título I. Normas rectoras de la ley penal. Título IV. Punibilidad.',
  },
];

interface UseCodigoConvivenciaReturn {
  query: string;
  setQuery: (query: string) => void;
  filteredLeyes: Ley[];
  resetTimer: () => void;
}

export default function useCodigoConvivencia(navigation: any): UseCodigoConvivenciaReturn {
  const [query, setQuery] = useState<string>('');

  const { resetTimer } = useInactivity(navigation, 'Bienvenida');

  const filteredLeyes = useMemo(() => {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return defaultLeyes;
    return defaultLeyes.filter(l => {
      return (
        String(l.titulo || '').toLowerCase().includes(q) ||
        String(l.descripcion || '').toLowerCase().includes(q)
      );
    });
  }, [query]);

  return { query, setQuery, filteredLeyes, resetTimer };
}
