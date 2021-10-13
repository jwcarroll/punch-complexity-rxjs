import { fromEvent } from "rxjs";

const keyPresses$ =
  fromEvent(document, "keypress");

keyPresses$.subscribe(e => {
  console.log(e.key);
});
