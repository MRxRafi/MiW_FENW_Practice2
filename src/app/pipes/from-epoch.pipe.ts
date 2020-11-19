import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromEpoch'
})
export class FromEpochPipe implements PipeTransform {

  transform(epoch: number): string {
    let date: string;
    const fromEpoch = new Date(epoch);
    date = fromEpoch.getDate() + '/' + (fromEpoch.getMonth() + 1) + '/' + fromEpoch.getFullYear();
    return date;
  }

}
