import './style.css';

import { of, map, Observable, interval, take, Subject } from 'rxjs';

const hybirdObservable = {
  observes: [],
  subscribe(observe) {
    this.observes.push(observe)
  },
  next(value) {
    this.observes.forEach(observe => observe.next(value))
  },
  error(error) {
    this.observes.forEach(observe => observe.error(error))
  },
  complete() {
    this.observes.forEach(observe => observe.complete())
  }
}
const observeA = {
  next(value) {
    console.log('Observable A: ', value)
  },
  error(error) {
    console.error('Observable A: ', error)
  },
  complete() {
    console.log('Observable A: Complete')
  }
}
const observeB = {
  next(value) {
    console.log('Observable B: ', value)
  },
  error(error) {
    console.error('Observable B: ', error)
  },
  complete() {
    console.log('Observable B: Complete')
  }
}

// hybirdObservable.subscribe(observeA);
// const observable = interval(1000).pipe(take(5))
// observable.subscribe(hybirdObservable),
// setTimeout(function() {
//   hybirdObservable.subscribe(observeB)
// }, 2000)



const subject = new Subject();
subject.subscribe(observeA)
interval(500).pipe(take(5))
setTimeout(() => {
  subject.subscribe(observeB)
}, 2000)