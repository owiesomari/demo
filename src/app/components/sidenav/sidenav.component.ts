import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


  options = [
    {icon:"bi bi-gear", title: "لوحة التحكم"},
    {icon:"bi bi-cart", title: " كاتالوج المنتجات"},
    {icon:"bi bi-list", title: "منتجاتي "},
    {icon:"bi bi-cart4", title: "الطلبات "}
    
  ]

  owies(){
    console.log("h")
    var navBar = document.querySelector("nav");

    var menuBtns = document.querySelectorAll(".menu-icon");
    var overlay = document.querySelector(".overlay");

  menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
      console.log("h")
     navBar?.classList.toggle("open");
    });
  });

  overlay?.addEventListener("click", () => {
    console.log("h")
    navBar?.classList.remove("open");
  });
  }
  constructor() {this.owies() }

  ngOnInit(): void {
  }

}
