import { Component, OnInit } from '@angular/core';
import { PredictionService } from "src/services/prediction/prediction.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StockTitle } from "src/common/classes/StockTitle";
import { Observable } from "rxjs";
import { StockTitleService } from "../../services/stock-title/stock-title.service";
import { map, startWith } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import Chart from 'chart.js/auto';
import { StockHistoric, StockHistoricInput } from "../../common/classes/StockHistoric";
import { MatTableDataSource } from "@angular/material/table";
import csv from "csvtojson";

@Component({
  selector: 'app-prediction-dashboard',
  templateUrl: './prediction-dashboard.component.html',
  styleUrls: ['./prediction-dashboard.component.scss']
})
export class PredictionDashboardComponent implements OnInit {
  form: FormGroup;
  uploadedFile?: File;
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;
  lookUpDays: number = 7;
  predictedPrice?: number;
  isUploadingFile = false;

  chart: Chart;
  predictionChart: Chart;

  constructor(private predictionService: PredictionService, private stockTitleService: StockTitleService, private toastr: ToastrService) {
    this.form = new FormGroup({
      title: new FormControl({ value: '', disabled: false }, [Validators.required]),
      interval: new FormControl({ value: '1month', disabled: false }, [Validators.required]),
      lookUpDays: new FormControl({ value: '7', disabled: false}, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.setupChart();
    this.form.valueChanges.subscribe(form => {
      this.lookUpDays = parseInt(form.lookUpDays);
      if (form.interval == "all") {
        form.interval = null;
      }
      this.fetchStockHistoric(form.title.symbol, form.interval);
      this.fetchPrediction(form.title.symbol, this.lookUpDays);
    });
    this.fetchTitles();
  }

  private setupChart() {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Historic',
          data: [],
          fill: false
        }]
      }
    });


    this.predictionChart = new Chart('predictionChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Real',
          data: [],
          fill: false
        }, {
          label: 'Predicción',
          data: [],
          fill: false
        }]
      }
    })
  }

  private fetchStockHistoric(symbol: string, interval?: string) {
    if (symbol === undefined) {
      return;
    }
    this.predictionService.getStockHistoricBySymbol(symbol, interval).subscribe(result => {
      this.chart.data = {
        labels: result.map(item => {
          let date = new Date(+item.date);
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }),
        datasets: [{
          label: 'Histórico',
          data: result.map(item => item.closePrice),
          fill: true,
          pointRadius: 1,
          borderWidth: 1,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)'
        }]
      }
      this.chart.update();
    }, error => {
      console.error(error);
    });
  }

  private fetchPrediction(symbol: string, lookUpDays: number = 15) {
    console.info('Getting prediction')
    if (symbol === undefined) {
      return;
    }
    this.predictionService.getPrediction(symbol, lookUpDays).subscribe(result => {
      this.predictedPrice = result.futurePrice;
      this.predictionChart.data = {
        labels: result.trueData.x,
        datasets: [{
          label: 'Real',
          data: result.trueData.y,
          fill: true,
          pointRadius: 1,
          borderWidth: 1,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)'
        }, {
          label: 'Predicción',
          data: result.data.y,
          fill: true,
          pointRadius: 1,
          borderWidth: 1,
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 0.3)'
        }]
      }
      this.predictionChart.update();
    }, error => {
      console.error(error);
    });
  }

  private fetchTitles() {
    this.stockTitleService.getTitlesWithAmount().subscribe(results => {
      this.titles = results ?? [];
      if (results.length > 0) {
        this.form.get('title')?.setValue(results[0]);
      }
      this.setupTitleFilter();
      console.log(results);
    }, error => {
      console.error(error);
      this.toastr.error('Hubo un error al obtener los títulos', 'Error');
    })
  }

  private setupTitleFilter() {
    this.filteredTitles = this.form.get('title')?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.titles.slice())
      );
  }

  private _filter(name: string): StockTitle[] {
    const filterValue = name.toLowerCase();
    return this.titles.filter(title => (title.symbol.toLowerCase().includes(filterValue) || title.name?.toLowerCase().includes(filterValue)));
  }

  getOptionText(option?: StockTitle): string {
    let text = '';
    if (option && option.symbol) {
      text = `${option.symbol}`;
      if (option.name) {
        text += ` | ${option.name}`;
      }
    }
    return text;
  }

  downloadCSVDocument() {

  }

  downloadJSONDocument() {

  }

  setSelectedFile(event: any) {
    console.info(`${event.target.files.length} file was selected`);
    if (event.target.files.length > 0) {
      this.uploadedFile = event.target.files[0];
    } else {
      this.uploadedFile = undefined;
    }
  }

  uploadDocument() {
    if (!this.uploadedFile) return;
    let fileExtension = this.uploadedFile.name.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
      case 'json':
        this.uploadJSONDocument(this.uploadedFile);
        break;
      case 'csv':
        this.uploadCSVDocument(this.uploadedFile);
        break;
      default:
        break;
    }
  }

  private uploadJSONDocument(file: File) {
    let fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      let json = JSON.parse(fileReader.result as string);
      if (json.stock_historic) {
        this.saveStockHistoric(json.stock_historic);
      }
    }
  }

  private uploadCSVDocument(file: File) {
    let fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      csv().fromString(fileReader.result as string)
        .then((json) => {
          this.saveStockHistoric(json);
        });
    }
  }

  private formatJSON(json: any[]): StockHistoricInput[] {
    let stocks: StockHistoricInput[] = [];
    json.map((item: any) => {
      if (!item.close_price) {
        return;
      }
      let stock = new StockHistoricInput(item.symbol,
        item.stock_date,
        item.symbol_description,
        parseFloat(item.close_price),
        parseFloat(item.open_price ? (isNaN(item.open_price) ? item.close_price : item.open_price) : item.close_price),
        parseFloat(item.high_price ? (isNaN(item.high_price) ? item.close_price : item.high_price) : item.close_price),
        parseFloat(item.low_price ? (isNaN(item.low_price) ? item.close_price : item.low_price) : item.close_price),
        item.volume,
        item.change);
      stocks.push(stock);
    });
    return stocks;
  }

  private saveStockHistoric(json: any[]) {
    this.isUploadingFile = true;
    let stocks = this.formatJSON(json);
    this.predictionService.createStockHistoric(stocks).subscribe(response => {
      this.isUploadingFile = false;
      this.uploadedFile = undefined;
      console.info(response);
    }, error => {
      this.isUploadingFile = false;
      console.error(error);
    });
  }

  deleteFile() {
    this.uploadedFile = undefined;
  }

}
