import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() { }

  public createAlert(title:string, text:string, showCancelButton:boolean = false, icon:ICON_SWAL){

    const options = {
      showCloseButton: true,
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar',
      showCancelButton,
      cancelButtonText: 'Cancelar'
    };

    return Swal.fire(options);
  }
}

export enum ICON_SWAL {
  SUCCESS = 'success',
  QUESTION = 'question',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}
