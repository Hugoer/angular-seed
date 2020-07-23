import { ComponentCanDeactivate } from './ComponentCanDeactivate';
import { NgForm } from '@angular/forms';

export abstract class FormCanDeactivate extends ComponentCanDeactivate {
  abstract get form(): NgForm;

  canDeactivate(): boolean {
    return this.form.submitted || !this.form.dirty;
  }
}
