import { Component, OnInit } from '@angular/core';
import {PredictionService} from "src/services/prediction/prediction.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StockTitle} from "src/common/classes/StockTitle";
import {Observable} from "rxjs";
import {StockTitleService} from "../../services/stock-title/stock-title.service";
import {map, startWith} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import Chart from 'chart.js/auto';
import {StockHistoric} from "../../common/classes/StockHistoric";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-prediction-dashboard',
  templateUrl: './prediction-dashboard.component.html',
  styleUrls: ['./prediction-dashboard.component.scss']
})
export class PredictionDashboardComponent implements OnInit {
  form: FormGroup;
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;

  latestsStocks: StockHistoric[] = [];
  chart: Chart;

  isLoading: boolean = false;
  errorLoading: boolean = false;
  displayedColumns: string[] = [
    'symbol',
    'value',
    'date'
  ];
  dataSource = new MatTableDataSource<StockHistoric>(this.latestsStocks);

  constructor(private predictionService: PredictionService, private stockTitleService: StockTitleService, private toastr: ToastrService) {
    this.form = new FormGroup({
      title: new FormControl({value: '', disabled: false}, [Validators.required]),
      interval: new FormControl({value: '1month', disabled: false}, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.setupChart();
    this.form.valueChanges.subscribe(form => {
      if (form.interval == "all") {
        form.interval = null;
      }
      this.fetchStockHistoric(form.title.symbol, form.interval);
    });
    this.fetchTitles();
    this.setupChart();
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

  fetchStocksFromBVC() {
    this.isLoading = true;
    this.errorLoading = false;
    this.predictionService.getStocksFromBVC().subscribe(result => {
      this.latestsStocks = result;
      this.dataSource = new MatTableDataSource<StockHistoric>(this.latestsStocks);
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = true;
      this.errorLoading = true;
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
    return this.titles.filter(title => (title.symbol.toLowerCase().includes(filterValue) || title.name.toLowerCase().includes(filterValue)));
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
  }

}
