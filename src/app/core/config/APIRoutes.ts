import {environment} from '../../../environments/environment';

export const APIRoutes = {
  ROOT: environment.domain,
  NEWS: `/servicios/noticias`,
  PROGRAM_INTERES: `/servicios/programas`,
  REGISTER: `/servicios/registro`,
  PRODUCT: `/assets/json/ofertas.json`,
};
