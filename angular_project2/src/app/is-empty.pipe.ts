import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEmpty',
  standalone: true
})
export class IsEmptyPipe implements PipeTransform {

 
  transform(value: any): boolean {

    return Object.keys(value[0]).length === 0
    
  }

}
