import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  transform(value?: any) {
    if (!value) {
        return '-';
    }
    return value;
}

}
