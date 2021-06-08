import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(word: string): string {
    if (!word) return word;
    return word.substr(0, 1).toUpperCase();
  }

}
