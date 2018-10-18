import { Observable } from 'rxjs';

const myObservable$ =
  new Observable(observer => {
    observer.next(1);
    observer.complete();
  });

myObservable$.subscribe(
  val => console.log(val),
  err => console.log(err),
  () => console.log("Complete!")
);



