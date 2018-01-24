import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

@Component({
    selector: 'sign-up',
    templateUrl: './signUp.html'
})

export class SignUpComponent {

    private id: string = '';
    private password: string = '';
    private name: string = '';
    private phone: string = '';
    private address: string = '';
    private email: string = '';
    private errorMessage: string = '';

    private  idReg = /^[a-z]+[a-z0-9]{3,14}$/g;
    private  nameReg = /^[a-z]{1,20}$/g;
    private  passwordReg = /^[a-z0-9]{10,20}$/g;
    private  phoneReg = /^\d{3,4}-\d{3,4}-\d{3,4}$/g;
    private  emailReg
        = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    constructor(private nav: Nav, private http: Http){};

    submit() {
        if (!this.id.match(this.idReg)) {
            this.errorMessage = 'Invalid id';
            return;
        } else if (!this.password.match(this.passwordReg)) {
            this.errorMessage = 'Invalid password';
            return;
        } else if (!this.name.match(this.nameReg)) {
            this.errorMessage = 'Invalid name';
            return;
        } else if (!this.phone.match(this.phoneReg)) {
            this.errorMessage = 'Invalid phone';
            return;
        } else if (!this.email.match(this.emailReg)) {
            this.errorMessage = 'Invalid email';
            return;
        }

        var signUpData = {
            'id': this.id,
            'password': this.password,
            'name': this.name,
            'phone': this.phone,
            'email': this.email,
            'address': this.address
        };

        this.http.post('http://localhost:5000/sign', signUpData).
            subscribe(response => {
                this.nav.setRoot(HomePage);
            }, error => {
                this.errorMessage = 'fail to sign up';
        });
    }
};
