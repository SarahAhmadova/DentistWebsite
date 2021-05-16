import { ISpeciality } from 'src/app/shared/models/speciality.model';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/views/app/pages/specialities/sortable.directive';
import { Observable } from 'rxjs';
import { specService } from 'src/app/shared/services/specService.service';





@Component({
  selector: 'speciality-table',
  templateUrl: './speciality-table.component.html',
  styleUrls: ['./speciality-table.component.scss']
})
export class SpecialityTableComponent implements OnInit {

  public specList: ISpeciality[] =[];

  constructor(private apiService: ApiService, public service: specService) {
    this.specs$ = service.specs$;
    this.total$ = service.total$;

    this.apiService.getSpecs().subscribe(
      list=>{
        this.specList = list;
      },
      err=>{
        console.log(err);

      }
    )
  }
  ngOnInit(): void {
    console.log(this.specList);

  }

  specs$: Observable<ISpeciality[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;



  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}



