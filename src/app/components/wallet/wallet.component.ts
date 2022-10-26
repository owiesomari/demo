import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

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

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
