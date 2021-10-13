import { Observable } from 'rxjs';

const myObservable$ =
  new Observable(observer => {
    observer.next(1);
    observer.complete();
  });

myObservable$.subscribe({
  next: val => console.log(val),
  error: err => console.log(err),
  complete: () => console.log("Complete!")
});



