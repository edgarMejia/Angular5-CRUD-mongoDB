import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent {
    frm:FormGroup;

    constructor(
        public dialogRef: MatDialogRef<FormComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private fb:FormBuilder,
        private personService:PersonService,
        public snack: MatSnackBar
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.initializeForm();
    }

    openSnack(data) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    initializeForm(){
        if(this.data.action=='edit'){
            this.frm = this.fb.group({
                firstName: new FormControl(this.data.data.firstName, [Validators.required, Validators.minLength(3)]),
                lastName: new FormControl(this.data.data.lastName, [Validators.required, Validators.minLength(4)]),
                email: new FormControl(this.data.data.email, [Validators.required, Validators.minLength(6)]),
                department: new FormControl(this.data.data.department, [Validators.required, Validators.minLength(4)]),
                dui: new FormControl(this.data.data.dui, [Validators.required, Validators.minLength(10)]),
                nit: new FormControl(this.data.data.nit, [Validators.required, Validators.minLength(10)]),
                cellphone: new FormControl(this.data.data.cellphone, [Validators.required, Validators.minLength(8)]),
                telephone: new FormControl(this.data.data.telephone, [Validators.required, Validators.minLength(8)]),
                birthDate: new FormControl(this.data.data.birthDate, [Validators.required]),
                gender: new FormControl(this.data.data.gender, [Validators.required]),
                lenguages: new FormControl(this.data.data.lenguages, [Validators.required]),
                address: new FormControl(this.data.data.address, [Validators.required]),
                emergencyContact: new FormControl(this.data.data.emergencyContact, [Validators.required, Validators.minLength(8)]),
                licenceNumber: new FormControl(this.data.data.licenceNumber, [Validators.required, Validators.minLength(10)]),
                hireOn: new FormControl(this.data.data.hireOn, [Validators.required]),
                _id: new FormControl(this.data.data.hireOn)
            });
        }else{
            this.frm = new FormGroup({
                firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
                lastName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
                email: new FormControl(null, [Validators.required, Validators.minLength(6)]),
                department: new FormControl(null, [Validators.required, Validators.minLength(4)]),
                dui: new FormControl(null, [Validators.required, Validators.minLength(10)]),
                nit: new FormControl(null, [Validators.required, Validators.minLength(10)]),
                cellphone: new FormControl(null, [Validators.required, Validators.minLength(8)]),
                telephone: new FormControl(null, [Validators.required, Validators.minLength(8)]),
                birthDate: new FormControl(null, [Validators.required]),
                gender: new FormControl(null, [Validators.required]),
                lenguages: new FormControl(null, [Validators.required]),
                address: new FormControl(null, [Validators.required]),
                emergencyContact: new FormControl(null, [Validators.required, Validators.minLength(8)]),
                licenceNumber: new FormControl(null, [Validators.required, Validators.minLength(10)]),
                hireOn: new FormControl(null, [Validators.required]),
                _id: new FormControl(null)
            });
        }
    }

    save(form:FormGroup){
        console.log(form.value);
        this.personService.save(form.value).subscribe((data:any) => {
            if(data.success){
                this.dialogRef.close(true);
                this.openSnack(data);
            }else{
                this.openSnack(data);
            }
        });
    }

    getFirstNameErrorMessage() {
        return this.frm.controls.firstName.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.firstName.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getLastNameErrorMessage() {
        return this.frm.controls.lastName.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.lastName.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getEmailErrorMessage() {
        return this.frm.controls.email.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.email.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getDepartmentErrorMessage() {
        return this.frm.controls.department.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.department.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getDuiErrorMessage() {
        return this.frm.controls.dui.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.dui.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getNitErrorMessage() {
        return this.frm.controls.nit.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.nit.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getCellphoneErrorMessage() {
        return this.frm.controls.cellphone.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.cellphone.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getTelephoneErrorMessage() {
        return this.frm.controls.telephone.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.telephone.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getBirthDateErrorMessage() {
        return this.frm.controls.birthDate.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.birthDate.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getGenderErrorMessage() {
        return this.frm.controls.gender.hasError('required') ? '' : '';
    }
    getLenguagesErrorMessage() {
        return this.frm.controls.lenguages.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.lenguages.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getAddressErrorMessage() {
        return this.frm.controls.address.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.address.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getEmergencyContactErrorMessage() {
        return this.frm.controls.emergencyContact.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.emergencyContact.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getLicenceNumberErrorMessage() {
        return this.frm.controls.licenceNumber.hasError('required') ? 'El campo Nombre es obligatorio' :
        this.frm.controls.licenceNumber.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }
    getHireOnErrorMessage() {
        return this.frm.controls.hireOn.hasError('required') ? 'El campo edad es obligatorio' :
        this.frm.controls.hireOn.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
    }
}