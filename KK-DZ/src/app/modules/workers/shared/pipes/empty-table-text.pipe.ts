import { Pipe, PipeTransform } from '@angular/core';

import { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';

@Pipe({
    name: 'emptyTableText'
})
export class EmptyTableText implements PipeTransform {
  transform(filters: EmployeeFiltersState): string {
    return Object.keys(filters).length === 0 ? 'Brak danych.' : 'Nie znaleziono wyników dla podanych kryteriów.'
  }
}
