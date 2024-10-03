// In this section I used the MVC desing as is the default workflow from angular
// Design Pattern - MVC

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gapsi';
  deferredPrompt: any;
  showInstallButton: boolean = false;
  logoSource = '../assets/logo.png';

  // PWA instalation workflow
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallButton = true;
  }

  // PWA Installation
  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        this.deferredPrompt = null;
      });
    }
  }
}
