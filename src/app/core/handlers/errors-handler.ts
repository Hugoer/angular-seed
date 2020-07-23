import { ErrorHandler, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}
  // handleError(error: Error) {
  handleError(error: any) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    if (
      error instanceof HttpErrorResponse ||
      error.rejection instanceof HttpErrorResponse
    ) {
      // console.log('error httpresponse from global handle');
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      console.error(error);
      this.snackBar.open(error.message, null, {
        duration: environment.toast.duration,
        verticalPosition: environment.toast
          .verticalPosition as MatSnackBarVerticalPosition,
        horizontalPosition: environment.toast
          .horizontalPosition as MatSnackBarHorizontalPosition,
        panelClass: 'style-error',
      });
    }
  }
}
