import { interval } from "rxjs";
import { take, scan } from "rxjs/operators";

const nums$ = interval(100)
  .pipe(take(30));

nums$
  .pipe(
    scan(
      (acc, val) => ({
        left: acc.sum,
        right: val,
        sum: acc.sum + val
      }),
      { left: 0, right: 0, sum: 0 }
    )
  )
  .subscribe(val => {
    console.log(
      `${val.left} + ${val.right} = ${val.sum}`
    );
  });
