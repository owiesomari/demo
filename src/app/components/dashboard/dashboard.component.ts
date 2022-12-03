import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Dashboard } from 'src/app/Entities/Dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Alert } from 'src/app/utils/Alert';
import { CacheManager } from 'src/app/utils/CasheManager';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idInfoVisibile: Boolean = false;
  private globalDashboardService: DashboardService;
  private alert: Alert = new Alert();
  dashboardData = new Dashboard();

  constructor(dashboardService: DashboardService) {
    this.globalDashboardService = dashboardService;
  }

  showDropphiSupport(event: any) {
    this.idInfoVisibile = event.target.checked
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.alert.showSpinner();
    this.globalDashboardService.getDashboardData().subscribe(res => {
      this.dashboardData = res;
      var contentContainer: HTMLDivElement = document.getElementById("content") as HTMLDivElement;
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })

  }

}