import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private isAutheticatedUser: boolean = false;
  private token: any;
  private user: any;

  constructor( private httpClient: HttpClient) {}

  checkToken(){
    return Promise.resolve(true);
  }
  authenticateUser(status: boolean){
    localStorage.setItem('isAutheticatedUser', JSON.stringify(status));
    this.isAutheticatedUser = status;
  }
  userIsauthenticate(): Promise<boolean>{
    this.isAutheticatedUser = localStorage.getItem('isAutheticatedUser') == "true";
    return Promise.resolve(this.isAutheticatedUser);
  }
  setToken(token: string){
    localStorage.setItem('token', token);
    this.token = token;
  }
  get getToken(){
    this.token = localStorage.getItem('token');
    return this.token;
  }
  cleanToken(){
    this.token = null;
    this.user = null;
  }
  dataUserLogged(){
    this.authenticateUser(false);
    this.checkToken;
    localStorage.clear();
    sessionStorage.clear();
  }
}

