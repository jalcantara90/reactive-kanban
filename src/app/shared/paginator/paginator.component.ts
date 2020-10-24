import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

const LIMIT_LOW = 5;
const LIMIT_MID = 10;
const LIMIT_HIGH = 20;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  private page$ = new BehaviorSubject(0);
  private total$ = new BehaviorSubject(1000);

  public limits = LIMITS;
  public limit$ = new BehaviorSubject(LIMIT_LOW);
  public paginationPage$ = this.page$.pipe(map(page => page + 1));
  public totalPages$ = combineLatest(this.total$, this.limit$).pipe(
    map(([total, limit]) => Math.ceil(total / limit))
  );
  public isFirstPage$ = this.page$.pipe(map(page => page === 0));
  public isLastPage$ = combineLatest(this.page$, this.totalPages$).pipe(map(([page, totalPages]) => page === totalPages - 1));

  @Input() set total(total: number) { this.total$.next(total) };
  @Output() pagination = combineLatest(this.page$, this.limit$).pipe(debounceTime(300));

  constructor() { }

  public changePage(num: number): void {
    const currentPage = this.page$.getValue();
    this.page$.next(currentPage + num);
  }

  public changeLimit(limit: number): void {
    this.limit$.next(+limit);
    this.page$.next(0);
  }
}
