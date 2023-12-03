import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {

      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `bearer ${token}`,
        },
      });


      return next.handle(modifiedRequest).pipe(
        tap((event) => {
          console.log('After Interceptor & Token Found:', event);
        })
      );
    }

  
    return next.handle(request).pipe(
      tap((event) => {
        console.log('After Interceptor & Token Not Found:', event);
      })
    );
  }
}