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
  profileImage = "";
  constructor(
    private _router: Router,
    private _api: ApiService
  ) {
  }

  ngOnInit() {
    this.getAppVersion();
    this.getUser();
  }

  getUser() {
    this._api.getRandomNameAndPhoto().subscribe({
      next: (user) => {
        if (user.results) {
          this.candidateId = `${user.results[0].name?.title} ${user.results[0].name?.first} ${user.results[0].name?.last}`
          this.profileImage = `${user.results[0].picture?.large}`;
        }
      },
      error: (error) => { },
    })
  }

  getAppVersion() {
    this._api.getAppVersion().subscribe({
      next: (appversion) => {
        this.version = `${appversion.version}`
      },
      error: (error) => {
        console.log(JSON.stringify(error));
        this.version = environment.version;
      },
    })
  }

  // getProfileImage(){
  // return "https://picsum.photos/200";

  // }
  goToMain() {
    this._router.navigateByUrl('principal', { replaceUrl: true });
  }
}
