import { interval, from } from 'rxjs';
import * as _ from 'lodash';
import starWarsService from '../../services/starWarsService';

const episodes$ = interval(500)
  .pipe(skip(1),take(7));

episodes$
  .pipe(
    log(),
    onlyTheGoodOnes,
    log('Filtered'),
    mergeMap(id => starWarsService.getEpisode(id)),
    mergeMap(mov => from(mov.planets)),
    mergeMap(id => starWarsService.getPlanet(id))
  )
  .subscribe(planet => {
    console.stream('Planets').log(planet.name);
  });

function onlyTheGoodOnes(obs){
  return obs.pipe(filter(
    v => _.some([4,5,6], id => id === v)));
}



