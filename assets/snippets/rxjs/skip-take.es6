import { interval } from "rxjs";
import { skip, take } from "rxjs/operators";

const nums$ = interval(100);

nums$
  .pipe(
    log(),
    skip(20),
    take(10)
  )
  .subscribe(
    val => {
      console.stream("skip, take").log(val);
    },
    err => { },
    () => {
      console.log("Finished!");
    }
  );
