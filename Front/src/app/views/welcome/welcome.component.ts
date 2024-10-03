// In this section I used the MVC desing as is the default workflow from angular
// Design Pattern - MVC

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/network/api';
import { environment } from '../../../environments/environment.prod';
import { Utils } from '../../utils/utils';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  logoSource = '../assets/logo.png';
  candidateId: string = "01";
  version: string = "";
  profileImage = "";
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _utils: Utils
  ) {}

  ngOnInit() {
    this.getAppVersion();
    this.getUser();
  }

  // Get User random name and image from public API
  getUser() {
    this._api.getRandomNameAndPhoto().subscribe({
      next: (user) => {
        if (user.results) {
          this.candidateId = `${user.results[0].name?.title} ${user.results[0].name?.first} ${user.results[0].name?.last}`
          this.profileImage = `${user.results[0].picture?.large}`;
        }
      },
      error: (error) => {
        this._utils.launchMessage("Alerta", "Ocurrio un error al obtener la información del candidato.", "", false);
       },
    })
  }

  // Get backend app version or set the environment app version by default
  getAppVersion() {
    this._api.getAppVersion().subscribe({
      next: (appversion) => {
        this.version = `${appversion.version}`
      },
      error: (error) => {
        this.version = environment.version;
      },
    })
  }

  // Navigate to main windows
  goToMain() {
    this._router.navigateByUrl('principal', { replaceUrl: true });
  }

  // Open github repo
  about(){
    window.open("https://github.com/xpeknw/gapsi");
  }
}
