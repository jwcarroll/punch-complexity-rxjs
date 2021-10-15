import { fromEvent } from "rxjs";
import * as _ from "lodash";
import starWarsService from "../../services/starWarsService";

const keypresses$ =
  fromEvent(document, "keypress")
    .pipe(map(e => e.key));

keypresses$
  .pipe(
    log(),
    map(v => parseInt(v)),
    filter(v => !isNaN(v)),
    switchMap(id => starWarsService.getEpisode(id))
  )
  .subscribe(mov => {
    const title =
      (mov && mov.title) || "[Not Found]";

    console.stream("Films").log(title);
  });

