import { interval } from 'rxjs';
import {
  map, filter, tap
} from 'rxjs/operators';

const nums$ = interval(100);

const sub = nums$
  .pipe(
    tap(val => console.log(val)),
    filter(val => val % 5 === 0),
    tap(val => console.stream('filter').log(val)),
    map(val => val * val)
  )
  .subscribe(val => {
    console.stream('mapped').log(val);
  });

setTimeout(() => {
  sub.unsubscribe();
}, 10000);



