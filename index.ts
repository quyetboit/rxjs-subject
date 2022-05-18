import './style.css';

import {
  of,
  map,
  Observable,
  interval,
  take,
  Subject,
  observable,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
} from 'rxjs';

const hybirdObservable = {
  observes: [],
  subscribe(observe) {
    this.observes.push(observe);
  },
  next(value) {
    this.observes.forEach((observe) => observe.next(value));
  },
  error(error) {
    this.observes.forEach((observe) => observe.error(error));
  },
  complete() {
    this.observes.forEach((observe) => observe.complete());
  },
};
const observeA = {
  next(value) {
    console.log('Observable A: ', value);
  },
  error(error) {
    console.error('Observable A: ', error);
  },
  complete() {
    console.log('Observable A: Complete');
  },
};
const observeB = {
  next(value) {
    console.log('Observable B: ', value);
  },
  error(error) {
    console.error('Observable B: ', error);
  },
  complete() {
    console.log('Observable B: Complete');
  },
};

// hybirdObservable.subscribe(observeA);
// const observable = interval(1000).pipe(take(5))
// observable.subscribe(hybirdObservable),
// setTimeout(function() {
//   hybirdObservable.subscribe(observeB)
// }, 2000)

// --------------subject()-----------------------
// subject() vừa là 1 observable (có thể subscribe), vừa là 1 observer (có các phương thức next(), error() và complete). Nó sinh ra để có thể share các excution cho các observer khác nhau thông qua việc subscribe vào subject. Ngoài ra subject có thể gọi vào các phương thức next(), error(), complete().
// các ví dụ về subject()
// vd1: subject truyền vào 1 subcription để emit dữ liệu và share execution cho 2 observer khác nhau.
// const subject = new Subject()
// const subscription = interval(1000).pipe(take(5))
// subject.subscribe(observeA)
// subscription.subscribe(subject)
// setTimeout( () => {
//   subject.subscribe(observeB)
// }, 3000)

// vd2: subject() share execution cho 2 oberver và gọi đến next() để emit dữ liệu
// const subject2 = new Subject();
// subject2.subscribe(observeA)
// subject2.next(1)
// subject2.next(2)
// subject2.subscribe(observeB)
// subject2.next(3)

// --------------------BehaviorSubject()-----------------
// BehaviorSubjet(): Nhận vào 1 đối số là giá trị khởi tạo, sẽ emit đầu tiên
// BehaviorSubject(): Lưu trữ giá trị cuối cùng emit (gọi là the current value) trước khi 1 observer mới được subcribe vào và the current value sẽ được emit cho observer mới được subscribe ngay lập tức.
// Để lấy the current value (Tức emit cuối cùng) gọi đến value của behaviorSubject đó (vd: behaviorSubject.value).
// const behaviorSubject = new BehaviorSubject(0);
// behaviorSubject.subscribe(observeA)
// behaviorSubject.next(1)
// behaviorSubject.next(2)
// behaviorSubject.subscribe(observeB)
// behaviorSubject.next(3)
// console.log(behaviorSubject.value)

// ---------------------ReplaySubject()--------------------
// ReplaySubject(): giống như behavior subject() nhưng có thể chỉ định số lần dữ liệu được emit trược khi 1 ReplaySubject() subscribe 1 observer mới.
// ReplaySubject(): Nhận vào 2 đối số:
//  - Đối số 1: Số giá trị emit tối đa được lưu giữ trước khi subscribe 1 observable mới. Những giá trị này sẽ được emit cho observale mới được subscribe
//  - Đối số 2: (Optional) Khoảng thời gian tính bằng milisecond, khoảng thời gian tối đa tính đến thời điểm emit cuối cùng trước khi subscribe 1 observer mới. Các giá trị trong khoảng thời gian này mới được lưu trữ.
// const replaySubject = new ReplaySubject(4, 1000);
// const subscription = interval(1000).pipe(take(10));
// replaySubject.subscribe(observeA)
// subscription.subscribe(replaySubject)
// setTimeout( () => {
//   replaySubject.subscribe(observeB)
// }, 6000)

// ----------------------AsyncSubject()-------------------
// Chỉ emit giá trị cuối cùng của Observable execution cho các observer, chỉ emit khi observable execute complete().
// const asyncSubject = new AsyncSubject()
// asyncSubject.subscribe(observeA)
// asyncSubject.next(1)
// asyncSubject.next(2)
// asyncSubject.next(3)
// asyncSubject.next(4)
// asyncSubject.subscribe(observeB)
// asyncSubject.next(5)
// asyncSubject.complete()

// Còn nhiều nhưng đọc không hiểu :D
