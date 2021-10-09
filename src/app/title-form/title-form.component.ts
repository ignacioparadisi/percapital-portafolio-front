import { Component, OnInit } from '@angular/core';
import { StockTitle } from 'src/common/classes/StockTitle';
import { StockTitleService } from 'src/services/stock-title/stock-title.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss']
})
export class TitleFormComponent implements OnInit {

  constructor(private stockTitleService: StockTitleService, private dialogRef: MatDialogRef<TitleFormComponent>) { }

  ngOnInit(): void {
  }

  submit() {
    let stockTitle = new StockTitle('Nombre', 'NBR');
    this.stockTitleService.createTitle(stockTitle).subscribe((title: StockTitle) => {
      console.info('Did create Stock Title', title);
      this.dismiss();
    })
  }

  dismiss() {
    this.dialogRef.close();
  }

}
