import { Component, OnInit } from '@angular/core';
import { Validator } from 'src/app/utils/Valitator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private fname: HTMLInputElement | undefined
  private lname: HTMLInputElement | undefined
  private email: HTMLInputElement | undefined
  private phone: HTMLInputElement | undefined

  private validator:Validator | undefined


  constructor() {
    this.validator = new Validator()
  }

  saveChanges() {
    if (this.validateForm()) {
      //call api
    }

  }

  private validateForm(): Boolean {
    const info1 = document.getElementById("infotext1") as HTMLParagraphElement;
    const info2 = document.getElementById("infotext2") as HTMLParagraphElement;
    info1.style.display = "none"
    info2.style.display = "none"

    if(this.validator?.isElementEmpty(this.email)){
      info1.innerText= "هذا الحقل مطلوب";
      info1.style.display = "block";
      return false;
    }

    if(this.validator?.isElementEmpty(this.phone)){
      info2.innerText= "هذا الحقل مطلوب";
      info2.style.display = "block";
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.fname = document.getElementById("fname") as HTMLInputElement
    this.lname = document.getElementById("lname") as HTMLInputElement
    this.email = document.getElementById("email") as HTMLInputElement
    this.phone = document.getElementById("phone") as HTMLInputElement



    this.fname.value = "Owies"
    this.lname.value = "Alomari"
  }

}
