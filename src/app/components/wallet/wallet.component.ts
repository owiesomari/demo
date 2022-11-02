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
  bankForm: HTMLFormElement | undefined
  walletForm: HTMLFormElement | undefined
  WestrnForm: HTMLFormElement | undefined

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
      } else {
        this.openModal();
      }
    }
  }

  clearValidations(event: any) {
    let infoText: HTMLParagraphElement = document.getElementById("infotext") as HTMLParagraphElement
    let withdowInput: HTMLInputElement = (document.getElementById("withdrow") as HTMLInputElement)
    if (event.target.value != "" || event.target.value != null) {
      withdowInput.style.border = "1px solid #ccc";
      withdowInput.className = "effect-9 5 margin-top-s"
      infoText.innerText = ""
    }
  }

  transferTypeClick(event: any) {
    this.bankForm!.style.display = 'none';
    this.walletForm!.style.display = 'none';
    this.WestrnForm!.style.display = 'none';

    var bankDiv = document.getElementById("bank-div") as HTMLFormElement
    var walletDiv = document.getElementById("wallet-div") as HTMLFormElement
    var WestrnDiv = document.getElementById("westron-div") as HTMLFormElement

    bankDiv.style.background = "#fff"
    walletDiv.style.background = "#fff"
    WestrnDiv.style.background = "#fff"
    switch (event.target.id) {
      case "bank":
      case "bank-div": {
        this.bankForm!.style.display = 'block';
        bankDiv.style.background = "#ce0000"
      } break;

      case "wallet":
      case "wallet-div": {
        this.walletForm!.style.display = 'block';
        walletDiv.style.background = "#ce0000"
      } break;

      case "westron":
      case "westron-div": {
        this.WestrnForm!.style.display = 'block';
        WestrnDiv.style.background = "#ce0000"
      } break;
    }

  }

  openModal() {
    // this.removedProductID = event.target.id
    this.modalElement = document.getElementById('withdrawModal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
  }

  hideModal() {
    this.modalComponent?.hide();
    // window.location.reload();
  }

  ngOnInit(): void {
    this.bankForm = document.getElementById("bank-form") as HTMLFormElement
    this.walletForm = document.getElementById("wallet-form") as HTMLFormElement
    this.WestrnForm = document.getElementById("westrn-form") as HTMLFormElement
    var bankDiv = document.getElementById("bank-div") as HTMLFormElement
    bankDiv.style.background = "#ce0000"
    window.scrollTo(0, 0);
  }
}
