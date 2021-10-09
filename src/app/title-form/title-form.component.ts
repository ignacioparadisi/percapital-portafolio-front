import { Component, OnInit } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss']
})
export class TitleFormComponent implements OnInit {

  constructor(private stockTitleService: StockTitleService) { }

  ngOnInit(): void {
  }

  submit() {
    let stockTitle = new StockTitle('Nombre', 'NBR');
    this.stockTitleService.createTitle(stockTitle).subscribe((title) => {
      console.info('Did create Stock Title', title);
    })
  }

}
