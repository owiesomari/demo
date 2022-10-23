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

  initSideNav(){
    var navBar = document.querySelector("nav");

    var menuBtns = document.querySelectorAll(".menu-icon");
    var overlay = document.querySelector(".overlay");

  menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
     navBar?.classList.toggle("open");
    });
  });

  overlay?.addEventListener("click", () => {
    navBar?.classList.remove("open");
  });
  }
  constructor() {this.initSideNav() }

  ngOnInit(): void {
  }

}
