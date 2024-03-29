import { from } from "rxjs";
import * as _ from 'lodash';

const api = 'https://swapi.dev/api';

export class ProductionStarWarsService {
  getEpisode(episodeNumber) {
    const request = fetch(`${api}/films/`)
      .then(res => {
        return res.json();
      })
      .then(getResults)
      .then(films => {
        return _.find(films, { episode_id: episodeNumber })
      });

    return from(request);
  }

  getCharacter(id) {
    const request = fetch(`${api}/people/${cleanId(id)}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  getAllCharacters() {
    const request = fetch(`${api}/people/`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  findCharacters(searchTerm) {
    const request = fetch(`${api}/people/?search=${searchTerm}`)
      .then(res => {
        return res.json();
      })
      .then(getResults);

    return from(request);
  }

  findVehicles(searchTerm) {
    const request = fetch(`${api}/vehicles/?search=${searchTerm}`)
      .then(res => {
        return res.json();
      })
      .then(getResults);

    return from(request);
  }

  findStarships(searchTerm) {
    const request = fetch(`${api}/starships/?search=${searchTerm}`)
      .then(res => {
        return res.json();
      })
      .then(getResults);

    return from(request);
  }

  getPlanet(id) {
    const request = fetch(`${api}/planets/${cleanId(id)}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }
}

function getResults(paged) {
  return paged && paged.results;
}

function cleanId(id) {
  return (id || '').replace(/[^0-9]*/g, '');
}
