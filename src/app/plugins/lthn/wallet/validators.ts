import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function walletNameNotTakenValidator(walletList: string[]): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

		if (walletList.includes(value)) {
			return {walletNameTaken:true}
		}
		return null;
    }
}
