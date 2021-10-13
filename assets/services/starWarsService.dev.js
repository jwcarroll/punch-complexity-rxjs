import { from } from 'rxjs';

const api = 'http://localhost:4000';

export class DevStarWarsService {
  getEpisode(episodeNumber) {
    const request = fetch(`${api}/films?episode_id=${episodeNumber}`)
      .then(res => {
        return res.json();
      })
      .then(films => films && films[0]);

    return from(request);
  }

  getCharacter(id) {
    const request = fetch(`${api}/people/${id}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  getAllCharacters() {
    const request = fetch(`${api}/people`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  findCharacters(searchTerm) {
    const request = fetch(`${api}/people?name_like=${searchTerm}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  findVehicles(searchTerm) {
    const request = fetch(`${api}/vehicles?name_like=${searchTerm}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  findStarships(searchTerm) {
    const request = fetch(`${api}/starships?name_like=${searchTerm}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }

  getPlanet(id) {
    const request = fetch(`${api}/planets/${id}`)
      .then(res => {
        return res.json();
      });

    return from(request);
  }
}
