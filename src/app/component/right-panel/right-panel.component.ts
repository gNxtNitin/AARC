import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { NewsEventService } from 'src/app/service/news-event.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  selectedAgency:any;
  selectedCarrier:any;
  ticker:any;

  constructor(private dataSharingService: DataSharingService,
    private agencyService:AgencyService, private newsEventService: NewsEventService) { }

  ngOnInit(): void {
    this.dataSharingService.agencySelected.subscribe((agency)=>{
      if(agency)
      {
        this.agencyService.getAgencyById(agency.agency_id).subscribe((response)=>{
          this.selectedAgency = response[0];
          this.selectedCarrier = null;
          this.loadTickers(agency.agency_id);
         })
      } else{
        this.selectedAgency = null;
        this.selectedCarrier = null;
      }
      
     });
     this.dataSharingService.carrierSelected.subscribe((carrier)=>{
      if(carrier){
        this.selectedCarrier = carrier;
      } else {
        this.selectedCarrier = null;
      }
       
      });

      this.dataSharingService.tickerDeleted.subscribe((r)=>{
        this.loadTickers(this.selectedAgency.agency_id);
      })
  }

  loadTickers(agencyId:string)
  {
    this.ticker = '';
    this.newsEventService.getTickers().subscribe(r=>{
     this.ticker = r.find((e:any)=>e['AgencyCode'] == agencyId);
    })
  }

}
