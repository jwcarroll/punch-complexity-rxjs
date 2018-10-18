import { interval } from 'rxjs';
import * as _ from 'lodash';
import starWarsService from '../../services/starWarsService';

const episodes$ = interval(500)
    .pipe(skip(1),take(7));

episodes$.pipe(
  onlyTheGoodOnes,
  log(),
  mergeMap(id => starWarsService.getEpisode(id)),
  mergeMap(mov => from(mov.characters)),
  mergeMap(id => starWarsService.getCharacter(id)),
  retryWhen(errors =>
    errors.pipe(
      tap(val => {
        console.log(`retrying in 5 seconds...`);
      }),
      delay(5000))
  ),
  filter(char => char.gender === "male"),
  groupBy(char => char.name),
  mergeMap(g =>
    g.pipe(scan((acc, curr) => [...acc, curr], []))),
  map(arr => ({
    name: arr[0].name,
    movieCount: arr.length
  })))
  .subscribe(char => {
    console.stream('Male Characters')
      .log(`${char.name} [${char.movieCount}]`);
  });

function onlyTheGoodOnes(obs) {
  return obs.pipe(filter(
    v => _.some([4, 5, 6], id => id === v)));
}



