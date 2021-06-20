import {environment} from '../../../environments/environment';

export const APIRoutes = {
  ROOT: environment.domain,
  SIGNUP_USER: `/login`,
  REGISTER: `/register`,
  LINKS: `links`,
  MY_PROFILE: `user`,
  NEWS: `/servicios/noticias`,
  PROGRAM_INTERES: `/servicios/programas`,
};
