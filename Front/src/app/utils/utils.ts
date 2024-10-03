// Utilities to load a Fancy and customizable alert to display messages and handle actions in the system

import Swal from 'sweetalert2';
export class Utils{
  launchMessage(title: string, msg: string, color: string = '', showCancelButton: boolean = true) {
    switch (color) {
      case "danger":
        color = '#d9534f';
        break;
      case "warning":
        color = '#f0ad4e';
        break;
      default:
        color = '#5bc0de';
        break;
    }
    if (color == 'warning')
      color = "#f0ad4e"
    return Swal.fire({
      title: title,
      text: msg,
      showCancelButton: showCancelButton,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Ok',
      cancelButtonColor: '#c6c6c6',
      confirmButtonColor: color,
      showClass: {
        backdrop: 'swal2-noanimation',
        popup: '',
        icon: ''
      },
      hideClass: {
        popup: '',
      }
    });
  }
}
