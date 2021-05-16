import { ApiService } from 'src/app/shared/services/api.service';
import { ISpeciality } from 'src/app/shared/models/speciality.model';
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';


import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortColumn, SortDirection } from '../../views/app/pages/specialities/sortable.directive';

interface SearchResult {
  specs: ISpeciality[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number| Date, v2: string | number| Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(specs: ISpeciality[], column: SortColumn, direction: string): ISpeciality[] {
  if (direction === '' || column === '') {
    return specs;
  } else {
    return [...specs].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(spec: ISpeciality, term: string, pipe: PipeTransform) {
  return spec.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(spec.createdAt).includes(term);
}

@Injectable({providedIn: 'root'})


export class specService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _specs$ = new BehaviorSubject<ISpeciality[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  public specialities: ISpeciality[]=[];
  constructor(private pipe: DecimalPipe, private apiService: ApiService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._specs$.next(result.specs);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.apiService.getSpecs().subscribe(
      list=>{
        this.specialities = list;
        console.log(list);

      },
      err=>{
        console.log(err);

      }
    )
  }

  get specs$() { return this._specs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let specs = sort(this.specialities, sortColumn, sortDirection);

    // 2. filter
    specs = specs.filter(specList => matches(specList, searchTerm, this.pipe));
    const total = specs.length;

    // 3. paginate
    specs = specs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({specs, total});
  }
}
