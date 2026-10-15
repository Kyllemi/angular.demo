import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  return next(req).pipe(
    tap(() => console.log(`[HTTP] OK ${req.url}`)),
    catchError(err => {
      console.error(`[HTTP] Error ${req.url}`, err.message);
      return throwError(() => err);
    })
  );
};