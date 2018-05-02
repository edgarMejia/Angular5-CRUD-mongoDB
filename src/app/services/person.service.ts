import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Person } from '../models/Person';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PersonService {

    constructor(
        private router: Router,
        public http:HttpClient
    ) { }

    headers = new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
    });

    getList() {
        let params = new HttpParams();
        return this.http.get<PersonApi>('http://localhost:3000/api/person/get-persons');
    }

    delete(_id: number){
        return this.http.delete(
            'http://localhost:3000/api/person/delete-person/:id'.replace(':id', String(_id))
        );
    }

    save(person: Person){
        console.log(person);
        return this.http
            .post('http://localhost:3000/api/person/save-person',
                {
                    txtIdHidden: person._id,
			        txtFirstName: person.firstName,
			        txtLastName: person.lastName,
			        txtEmail: person.email,
			        txtDepartment: person.department,
			        txtDui: person.dui,
			        txtNit: person.nit,
			        txtCellphone: person.cellphone,
			        txtTelephone: person.telephone,
			        txtBirthDate: person.birthDate,
			        txtGender: person.gender,
			        txtLenguages: person.lenguages,
			        txtAddress: person.address,
			        txtEmergencyContact: person.emergencyContact,
			        txtLicenceNumber: person.licenceNumber,
			        txtHireOn: person.hireOn
                }
        );
    }
}

export interface PersonApi {
    success: boolean,
    data: Person[]
}