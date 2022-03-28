import { Component, OnInit } from '@angular/core';
import {PredictionService} from "../../services/prediction/prediction.service";

@Component({
  selector: 'app-prediction-dashboard',
  templateUrl: './prediction-dashboard.component.html',
  styleUrls: ['./prediction-dashboard.component.scss']
})
export class PredictionDashboardComponent implements OnInit {
  graphLayout = { autosize: true, title: 'BNC' }
  graphData: any = [{
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines+points',
    marker: {color: 'red'}
  }];

  constructor(private predictionService: PredictionService) { }

  ngOnInit(): void {
    this.predictionService.getStockHistoricBySymbol('BNC').subscribe(result => {
      let data = [{
        x: result.map(item => {
          let date = new Date(+item.date);
          return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        }),
        y: result.map(item => item.closePrice),
        type: 'scatter',
        mode: 'lines'
      }];
      this.graphData = data;
    }, error => {
      console.error(error);
    })
  }

  update() {
    console.log('Did update');
  }

  handleError(err: any) {
    console.log(err)
  }

}
