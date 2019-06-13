import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  intervalSub: Subscription;

  constructor() { }

  ngOnInit() {
    // this.intervalSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customInterval = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('The count is greater than 3!'));
        }
        count++;
      }, 1000);
    });


    this.intervalSub = customInterval.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + data;
    })).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      alert('Observer has completed!');
    });
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

}
