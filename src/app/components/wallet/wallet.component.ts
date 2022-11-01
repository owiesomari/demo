import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  modalElement: HTMLElement | undefined
  modalComponent: Modal | undefined


  constructor() { }

  withdrowClick() {
   let infoText: HTMLParagraphElement = document.getElementById("infotext") as HTMLParagraphElement
   let withdowInput: HTMLInputElement = (document.getElementById("withdrow") as HTMLInputElement)
    //check for empty 
    if (withdowInput.value == "" || withdowInput.value == null) {
      withdowInput.style.border = "1px solid red";
      infoText.innerText = "هذا الحقل مطلوب"
    } else {
      if (Number(withdowInput.value) < 6) {
        withdowInput.style.border = "1px solid red";
        infoText.innerText = "يجب ان تكون القيمة المطلوبه اكبر من 6 دنانير"
      }
    }
  }

  clearValidations(event:any){
    let infoText: HTMLParagraphElement = document.getElementById("infotext") as HTMLParagraphElement
   let withdowInput: HTMLInputElement = (document.getElementById("withdrow") as HTMLInputElement)
    if(event.target.value !="" || event.target.value !=null) {
      withdowInput.style.border = "1px solid #ccc";
      withdowInput.className = "effect-9 5 margin-top-s"
      infoText.innerText = ""
    }
  }

  openModal() {
   // this.removedProductID = event.target.id
    this.modalElement = document.getElementById('withdrawModal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
  }

  ngOnInit(): void {
    this.openModal();
    window.scrollTo(0, 0);
  }

}
