import { Component, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'src/app/Entities/User';
import { UserService } from 'src/app/services/user/user.service';
import { Alert } from 'src/app/utils/Alert';
import { Validator } from 'src/app/utils/Valitator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private globalUserService: UserService
  private alert = new Alert();

  userData = new User();

  private validator: Validator | undefined
  private base64: unknown

  constructor(userService: UserService) {
    this.validator = new Validator();
    this.globalUserService = userService;
  }

  uploadImage = async (event: any) => {
    const file = event.target.files[0];
    this.base64 = await this.convertBase64(file);
  };

  convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  saveChanges() {
    if (this.validateForm()) {
      //call api
      console.log(this.base64);
    }

  }

  private validateForm(): Boolean {
    const info1 = document.getElementById("infotext1") as HTMLParagraphElement;
    const info2 = document.getElementById("infotext2") as HTMLParagraphElement;
    info1.style.display = "none"
    info2.style.display = "none"

    if (this.validator?.isElementEmpty((document.getElementById("email") as HTMLInputElement))) {
      info1.innerText = "هذا الحقل مطلوب";
      info1.style.display = "block";
      return false;
    }

    if (this.validator?.isElementEmpty((document.getElementById("phone") as HTMLInputElement))) {
      info2.innerText = "هذا الحقل مطلوب";
      info2.style.display = "block";
      return false;
    }

    return true;
  }

  private fillData() {
    (document.getElementById("fname") as HTMLInputElement).value = this.userData.firstName;
    (document.getElementById("lname") as HTMLInputElement).value = this.userData.lastName;
    (document.getElementById("username") as HTMLInputElement).value = this.userData.userName;
    (document.getElementById("country") as HTMLInputElement).value = this.userData.country;
    (document.getElementById("city") as HTMLInputElement).value = this.userData.city;
    (document.getElementById("place") as HTMLInputElement).value = this.userData.town;
    (document.getElementById("address1") as HTMLInputElement).value = this.userData.address1;
    (document.getElementById("address2") as HTMLInputElement).value = this.userData.address2;
    (document.getElementById("postal") as HTMLInputElement).value = this.userData.postCode;
    (document.getElementById("company") as HTMLInputElement).value = this.userData.company;
    (document.getElementById("email") as HTMLInputElement).value = this.userData.email;
    (document.getElementById("phone") as HTMLInputElement).value = this.userData.phoneNumber;
    (document.getElementById("emailUnderImage") as HTMLSpanElement).innerText = this.userData.email;
    (document.getElementById("nameUnderImage") as HTMLSpanElement).innerText = this.userData.firstName + " " + this.userData.lastName;
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    (document.getElementById("up") as HTMLInputElement).addEventListener("change", (e) => {
      this.uploadImage(e);
    });


    this.alert.showSpinner();
    this.globalUserService.getUser().subscribe(res => {
      this.userData = res;
      var contentContainer: HTMLDivElement = document.getElementById("content_continer") as HTMLDivElement
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
      this.fillData()
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}
