import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../toasts/toast.service';
import { ErrorObj } from './error-obj.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const errorObj: ErrorObj = err.error;
        if (Array.isArray(errorObj.message)) {
          errorObj.message.forEach((msg) => {
            this.toastService.addToast({ message: msg, type: 'error' });
          });
        } else {
          this.toastService.addToast({
            message: errorObj.message,
            type: 'error',
          });
        }

        return throwError(() => err);
      }),
    );
  }
}
