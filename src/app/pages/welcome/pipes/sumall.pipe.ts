import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumall'
})
export class SumallPipe implements PipeTransform {

  transform(nums: number[] | string[]): number {
    let val = 0;
    nums.forEach(num => {
      val += Number(num);
    });

    return val;
  }

}
