import { Component, OnInit } from '@angular/core';
import {PredictionService} from "src/services/prediction/prediction.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StockTitle} from "src/common/classes/StockTitle";
import {Observable} from "rxjs";
import {StockTitleService} from "../../services/stock-title/stock-title.service";
import {map, startWith} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-prediction-dashboard',
  templateUrl: './prediction-dashboard.component.html',
  styleUrls: ['./prediction-dashboard.component.scss']
})
export class PredictionDashboardComponent implements OnInit {
  form: FormGroup;
  private titles: StockTitle[] = [];
  filteredTitles?: Observable<StockTitle[]>;

  graphLayout = { autosize: true, title: '' }
  graphData: any = [{
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines',
  }];

  constructor(private predictionService: PredictionService, private stockTitleService: StockTitleService, private toastr: ToastrService) {
    this.form = new FormGroup({
      title: new FormControl({value: '', disabled: false}, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.form.get('title')?.valueChanges.subscribe(title => {
      this.fetchStockHistoric(title.symbol);
    });
    this.fetchTitles();
  }

  private fetchStockHistoric(symbol: string) {
    this.predictionService.getStockHistoricBySymbol(symbol).subscribe(result => {
      let data = [{
        x: result.map(item => {
          let date = new Date(+item.date);
          return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        }),
        y: result.map(item => item.closePrice),
        type: 'scatter',
        mode: 'lines'
      }];
      this.graphLayout = { autosize: true, title: symbol }
      this.graphData = data;
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
    return this.titles.filter(title => (title.symbol.toLowerCase().includes(filterValue) || title.name.toLowerCase().includes(filterValue)));
  }

  getOptionText(option?: StockTitle): string {
    return option && option.symbol && option.name ? `${option.symbol} | ${option.name}` : '';
  }

}
