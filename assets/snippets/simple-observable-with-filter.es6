import { fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";
import * as _ from "lodash";

const keyPresses$ = 
  fromEvent(document, "keypress");

keyPresses$
  .pipe(
    map(e => e.key),
    log(),
    filter(key => _.some("aeiou", l => l == key))
  )
  .subscribe(key => {
    console.stream("filter").log(key);
  });
