import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { Http, Response } from '@angular/http';

import { HomePage } from '../home/home';
import { SignUpComponent } from '../sign-up/signUp';

@Component({
    selector: 'sign-in',
    templateUrl: './signIn.html'
})

export class SignInComponent {

    private id: string = '';
    private password: string = '';
    private errorMessage: string = '';
    private accessToken: string = '';

    private  idReg = /^[a-z]+[a-z0-9]{3,14}$/g;
    private  passwordReg = /^[a-z0-9]{10,20}$/g;

    constructor(private navCtrl: NavController, private nav: Nav, private http: Http){};

    signUp() {
        this.navCtrl.push(SignUpComponent);
    }

    signIn() {
        if (!this.id.match(this.idReg)) {
            this.errorMessage = 'login fail';
            return;
        } else if (!this.password.match(this.passwordReg)) {
            this.errorMessage = 'login fail';
            return;
        }
        this.http.get('http://localhost:5000/sign/' + this.id + '/' + this.password).
            subscribe((response: Response) => {
                if (response.json().success) {
                    this.accessToken = response.json().token;
                    this.nav.setRoot(HomePage);
                    return;
                }
                this.errorMessage = 'login fail';
            }, error => {
                this.errorMessage = 'login fail';
        });
    }
};
