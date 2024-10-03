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

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    // Previene que el navegador muestre automáticamente el banner de instalación
    event.preventDefault();
    // Guarda el evento para dispararlo más tarde
    this.deferredPrompt = event;
    // Muestra el botón de instalación
    this.showInstallButton = true;
  }

  installApp() {
    if (this.deferredPrompt) {
      // Muestra el prompt de instalación
      this.deferredPrompt.prompt();
      // Espera la respuesta del usuario
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario rechazó la instalación');
        }
        this.deferredPrompt = null; // Limpia el evento después de la interacción
      });
    }
  }
}
