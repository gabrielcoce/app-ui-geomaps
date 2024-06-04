import {
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
const TOKEN_KEY = 'access_token';
const TOKEN_KEY_HC = 'access_token_hc';
const ENDPOINT_SEC_AUTH = 'auth';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(ENDPOINT_SEC_AUTH)) return next(req);
  return next(addAccessToken(req));
};

const addAccessToken = (request: HttpRequest<unknown>) => {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  const accessTokenHC = localStorage.getItem(TOKEN_KEY_HC);
  const origen = window.location.href.includes('hc');
  const authToken = origen ? accessTokenHC : accessToken;
  const newRequest = request;
  const headers = new HttpHeaders({
    Authorization: `Bearer ${authToken}`,
    Accept: '*/*',
  });
  if (authToken) {
    return newRequest.clone({ headers });
  }
  return newRequest;
};
