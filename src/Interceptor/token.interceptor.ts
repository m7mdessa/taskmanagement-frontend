import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private delayDuration = 3000;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();

    const token = localStorage.getItem('token');

    if (token) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `bearer ${token}`,
        },
      });

      return next.handle(modifiedRequest).pipe(
        tap(
          (event) => {
            console.log('After Interceptor & Token Found:', event);

          },
          (error) => {

            this.handleErrorResponse(error);
          }
        ),
        finalize(() => setTimeout(() => this.spinner.hide(), this.delayDuration))
      );
    }

    return next.handle(request).pipe(
      tap(
        (event) => {
          console.log('After Interceptor & Token Not Found:', event);
        },
        (error) => {
          this.handleErrorResponse(error);
        }
      ),
      finalize(() => this.spinner.hide())
    );
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.toastr.error('Unauthorized access', 'Error');
    } else if (error.status === 403) {
      this.toastr.error('Access forbidden', 'Error');
    } else {
      this.toastr.error('An error occurred', 'Error');
    }
  }
}
