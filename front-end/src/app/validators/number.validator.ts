import {AbstractControl} from '@angular/forms';

export class NumberValidator {

  public static validate(c:AbstractControl) {
    let NUMBER_REGEXP = /^-?\d+\.?\d*$/;
    return NUMBER_REGEXP.test(c.value) ? null : {
      validateNumber: {
        valid: false
      }
    };
  }
}
