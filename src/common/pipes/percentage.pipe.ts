import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe extends DecimalPipe implements PipeTransform {
  transform(value?: any, args?: any) {
      if (isNaN(value) || value == null || value == undefined) {
          return value;
      }
      let result = super.transform(value, args);
      return `${result}%`
  }
}
