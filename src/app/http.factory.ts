/*
 * Created by Pankush Manchanda 10,August 2017
 * Http Interceptor to add diffrent function to http request like passing option in every request
 * Advantage : Used to remove the code duplication
 */

import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptedHttp } from "./http.interceptor";
import { LoaderService } from "./services/common/loader.service";
import { ConfirmationDialogsService } from "./services/dialog/confirmation.service";
import { AuthService } from "./services/authentication/auth.service";
import { Router } from "@angular/router";
import { SocketService } from "./services/socketService/socket.service";

export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  loaderService: LoaderService,
  router: Router,
  authService: AuthService,
  alertMessage: ConfirmationDialogsService,
  socketService: SocketService
 
): Http {
  return new InterceptedHttp(
    xhrBackend,
    requestOptions,
    loaderService,
    router,
    authService,
    alertMessage,
    socketService
  );
}