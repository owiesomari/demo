import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entities/User';
import { DropphiLink, UserRequest } from 'src/app/Entities/UserRequest';
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
  private validator: Validator | undefined
  private base64: unknown
  userData = new User();

  constructor(userService: UserService) {
    this.validator = new Validator();
    this.globalUserService = userService;
  }

  uploadImage = async (event: any) => {
    const file = event.target.files[0];
    this.base64 = await this.convertToBase64(file);
    (document.getElementById("marketerImage") as HTMLImageElement).src = String(this.base64);
  };

  convertToBase64 = (file: File) => {
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
      this.alert.showSpinner();

      var userRequest = new UserRequest();
      userRequest.firstName = (document.getElementById("fname") as HTMLInputElement).value;
      userRequest.lastName = (document.getElementById("lname") as HTMLInputElement).value
      userRequest.country = (document.getElementById("country") as HTMLInputElement).value

      userRequest.city = (document.getElementById("city") as HTMLInputElement).value;
      userRequest.town = (document.getElementById("place") as HTMLInputElement).value;
      userRequest.address1 = (document.getElementById("address1") as HTMLInputElement).value;
      userRequest.address2 = (document.getElementById("address2") as HTMLInputElement).value;
      userRequest.postCode = (document.getElementById("postal") as HTMLInputElement).value;
      userRequest.company = (document.getElementById("company") as HTMLInputElement).value;
      userRequest.email = (document.getElementById("email") as HTMLInputElement).value;
      userRequest.phoneNumber = (document.getElementById("phone") as HTMLInputElement).value;

      var shopify = new DropphiLink();
      if ((document.getElementById("shopify") as HTMLInputElement).value != '') {
        shopify.name = "shopify"
        shopify.url = (document.getElementById("shopify") as HTMLInputElement).value
      }

      var fb = new DropphiLink();
      if ((document.getElementById("facebook") as HTMLInputElement).value != '') {
        fb.name = "facebook"
        fb.url = (document.getElementById("facebook") as HTMLInputElement).value
      }

      var insta = new DropphiLink();
      if ((document.getElementById("insta") as HTMLInputElement).value != '') {
        insta.name = "instagram"
        insta.url = (document.getElementById("insta") as HTMLInputElement).value
      }

      if (shopify.name != '') userRequest.dropphiLinks.push(shopify)
      if (fb.name != '') userRequest.dropphiLinks.push(fb)
      if (insta.name != '') userRequest.dropphiLinks.push(insta)
      if (this.base64 != undefined) {
        userRequest.personalImage.image = String(this.base64).split(";")[1].split(",")[1];
        userRequest.personalImage.type = String(this.base64).split(";")[0].split(":")[1];
        userRequest.personalImage.name = "image1"
      }
      console.log(userRequest)
      this.globalUserService.updateUserInfo(userRequest).subscribe(res => {
        this.alert.hideSpinner();
        this.alert.setupAlertDiv("s", "تمت بنجاح", "تم تغيير معلوماتك بنجاح");
        window.location.reload();

      }, err => {
        console.log(err);
        this.alert.hideSpinner();
        this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
      })
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
    if (this.userData.personalImage.image.length == 0) {
      (document.getElementById("marketerImage") as HTMLImageElement).src = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
      (document.getElementById("uploadContainer") as HTMLDivElement).style.top = "56%";
    }
    else {
      (document.getElementById("uploadContainer") as HTMLDivElement).style.top = "65%";
    }
    if (this.userData.dropphiLinks.length > 0) {
      var shopify = this.userData.dropphiLinks.filter((obj) => {
        return obj.name == "shopify"
      });
      if (shopify.length > 0) {
        (document.getElementById("shopify") as HTMLInputElement).value = shopify[0].url;
      }

      var facebook = this.userData.dropphiLinks.filter((obj) => {
        return obj.name == "facebook"
      });

      if (facebook.length > 0) {
        (document.getElementById("facebook") as HTMLInputElement).value = facebook[0].url;
      }

      var insta = this.userData.dropphiLinks.filter((obj) => {
        return obj.name == "instagram"
      });

      if (insta.length > 0) {
        (document.getElementById("insta") as HTMLInputElement).value = insta[0].url;

      }
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    (document.getElementById("up") as HTMLInputElement).addEventListener("change", (e) => {
      this.uploadImage(e);
    });

    this.alert.showSpinner();
    this.globalUserService.getUser().subscribe(res => {
      this.userData = res;
      console.log(this.userData)
      var contentContainer: HTMLDivElement = document.getElementById("content_continer") as HTMLDivElement
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
      this.fillData()
    }, err => {
      console.log(err);
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}
