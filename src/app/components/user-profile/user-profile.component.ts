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
  private country: HTMLInputElement | undefined
  private city: HTMLInputElement | undefined
  private place: HTMLInputElement | undefined
  private address1: HTMLInputElement | undefined
  private address2: HTMLInputElement | undefined
  private postal: HTMLInputElement | undefined
  private company: HTMLInputElement | undefined
  private shopify: HTMLInputElement | undefined
  private facebook: HTMLInputElement | undefined
  private insta: HTMLInputElement | undefined
  private oldPassword: HTMLInputElement | undefined
  private newPassword: HTMLInputElement | undefined
  private confirmNewPassword: HTMLInputElement | undefined
  private marketerImage: HTMLImageElement | undefined

  private validator: Validator | undefined

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

    if (this.validator?.isElementEmpty(this.email)) {
      info1.innerText = "هذا الحقل مطلوب";
      info1.style.display = "block";
      return false;
    }

    if (this.validator?.isElementEmpty(this.phone)) {
      info2.innerText = "هذا الحقل مطلوب";
      info2.style.display = "block";
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.fname = document.getElementById("fname") as HTMLInputElement
    this.lname = document.getElementById("lname") as HTMLInputElement
    this.marketerImage = document.getElementById("marketerImage") as HTMLImageElement
    this.email = document.getElementById("email") as HTMLInputElement
    this.phone = document.getElementById("phone") as HTMLInputElement
    this.country = document.getElementById("country") as HTMLInputElement
    this.city = document.getElementById("city") as HTMLInputElement
    this.place = document.getElementById("place") as HTMLInputElement
    this.address1 = document.getElementById("address1") as HTMLInputElement
    this.address2 = document.getElementById("address2") as HTMLInputElement
    this.postal = document.getElementById("postal") as HTMLInputElement
    this.company = document.getElementById("company") as HTMLInputElement
    this.shopify = document.getElementById("shopify") as HTMLInputElement
    this.facebook = document.getElementById("facebook") as HTMLInputElement
    this.insta = document.getElementById("insta") as HTMLInputElement
    this.oldPassword = document.getElementById("oldPassword") as HTMLInputElement
    this.newPassword = document.getElementById("newPassword") as HTMLInputElement
    this.confirmNewPassword = document.getElementById("confirmNewPassword") as HTMLInputElement

    this.fname.value = "Owies"
    this.lname.value = "Alomari"
  }

}
