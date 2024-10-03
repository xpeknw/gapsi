import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/network/api';
import { environment } from '../../../environments/environment.prod';


@Component({
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  logoSource = '../assets/logo.png';
  candidateId: string = "01";
  version: string = "";
  constructor(
    private _router: Router,
    private _api: ApiService
  ) {
  }

  ngOnInit() {
    this.getAppVersion();
  }

  getAppVersion(){
    this._api.getAppVersion().subscribe({
      next:(appversion)=>{
        this.version = `${appversion.version}`
      },
      error:(error)=>{
        console.log(JSON.stringify(error));
        this.version = environment.version;
      },
    })
  }

  getProfileImage(){
    return "https://picsum.photos/200";

  }
  goToMain(){
    this._router.navigateByUrl('principal', {replaceUrl: true});
  }
}
