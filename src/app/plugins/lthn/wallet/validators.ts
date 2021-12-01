import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function nameNotTakenValidator(nameList: string[]): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

		if (nameList.includes(value)) {
			return {nameTaken:true}
		}
		return null;
    }
}
