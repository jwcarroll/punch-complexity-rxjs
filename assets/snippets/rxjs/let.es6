import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';


const nums$ = interval(100);

nums$
  .pipe(
    filter(val => val % 5 === 0),
    map(val => val * val)
  );

function modFiveSquared(obs) {
  return obs
    .pipe(
      filter(val => val % 5 === 0),
      map(val => val * val)
    );
}

const sub = nums$
  .pipe(modFiveSquared)
  .subscribe(val => {
    console.log(val);
  });

setTimeout(() => {
  sub.unsubscribe();
}, 10000);



