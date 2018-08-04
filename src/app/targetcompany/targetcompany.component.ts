import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';

class TargetCompany {
  constructor(
    public ID: string = '',
    public companyName: string = '',
    public keyContact: string = '',
    public status: string = 'Select Status',
    public financialPerformance: string = '',
  ) { }
}

@Component({
  selector: 'target-company',
  templateUrl: './targetcompany.component.html',
  
})
export class TargetCompanyComponent implements OnInit {


@ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

  // It maintains list of target companies
  targetcompanies: TargetCompany[] = [];
  // It maintains any company Model
  companyModel: TargetCompany;
  // It maintains add company form display status. By default it will be false means not visible.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of status.
  statuses: string[] = ['Researching', 'Pending Approval', 'Approved', 'Declined'];

  barChartLabels: string[]
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: any[]
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(211,211,211,1)',
      borderColor: 'rgba(169,169,169,1)',
      pointBackgroundColor: 'rgba(169,169,169,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(169,169,169,1)'
    }]
  
  getCompanyNamesForChart = function () {
    var companyLabels = [];
    for (var i = 0; i < this.targetcompanies.length; i++) {
      companyLabels.push(this.targetcompanies[i].companyName)
    }
    return companyLabels
  }

  getFinancialPerfByCompany() {
    var companyFinancialPerfArray = [];
    for (var i = 0; i < this.targetcompanies.length; i++) {
      companyFinancialPerfArray.push(parseInt(this.targetcompanies[i].financialPerformance))
    }
    return companyFinancialPerfArray
  }

  constructor() {
    // Add default company data.
    this.targetcompanies.push(new TargetCompany('1','Ernst & Young', 'elwin@gmail.com', 'Approved', '60'));
    this.targetcompanies.push(new TargetCompany('2','LTPI', 'ketty@gmail.com', 'Approved', '10'));
    this.targetcompanies.push(new TargetCompany('3','Morgan Stanley', 'vini@gmail.com', 'Declined', '40'));
    this.targetcompanies.push(new TargetCompany('4','Deloitte', 'peter@gmail.com', 'Pending Approval', '30'));
    this.barChartLabels = this.getCompanyNamesForChart()
    this.barChartData = [{ data: this.getFinancialPerfByCompany(), label: 'Target Company Data' }]
  }

 ngOnInit() {
  }
  // This method associate to New Button.
  onNew() {
    // Initiate new company data.
    this.companyModel = new TargetCompany();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display company add form.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save'  &&  (this.companyModel.financialPerformance!=='' && this.companyModel.companyName!=='' && this.companyModel.keyContact !=='' && this.companyModel.status!=='Select Status')) { 
      // Push company model object into company list.
      this.companyModel.ID=(this.targetcompanies.length + 1).toString()
      this.targetcompanies.push(this.companyModel);
      this.barChartData[0].data.push(parseInt(this.companyModel.financialPerformance))
    } else {
      // Update the existing properties values based on model.
      this.targetcompanies[this.selectedRow].ID = this.companyModel.ID;
      this.targetcompanies[this.selectedRow].companyName = this.companyModel.companyName;
      this.targetcompanies[this.selectedRow].keyContact = this.companyModel.keyContact;
      this.targetcompanies[this.selectedRow].status = this.companyModel.status;
      this.targetcompanies[this.selectedRow].financialPerformance = this.companyModel.financialPerformance;
      this.barChartData[0].data[this.selectedRow]=(parseInt(this.companyModel.financialPerformance));
    }
    this.barChartLabels = this.getCompanyNamesForChart()
    // Hide add company form.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new company.
    this.companyModel = new TargetCompany();
    // Retrieve selected company from list and assign to model.
    this.companyModel = Object.assign({}, this.targetcompanies[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display company add.
    this.showNew = true;
    //this.barChartLabels=this.getCompanyNamesForChart()
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding company entry from the list.
    this.targetcompanies.splice(index, 1);
    this.barChartLabels.splice(index, 1);
    for (var i = 0; i < this.barChartData[0].data.length-1; i++) {
      if (i === index) {
        this.barChartData[0].data.splice(index, 1);
      }
    }
    this.barChartData=[{ data: this.barChartData[0].data, label: 'Target Company Data' }]
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide add company form.
    this.showNew = false;
  }

  // This method associate to Bootstrap dropdown selection change.
  onChangeStatus(status: string) {
    // Assign corresponding selected country to model.
    this.companyModel.status = status;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
}
