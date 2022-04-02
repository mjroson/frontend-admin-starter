import {
    ArrayParam,
    NumberParam,
    StringParam
  } from 'use-query-params';
  import { CustomDateParam, DateRangeAfter, DateRangeBefore } from 'utils/filter-params';

/** 
 * Define filters to have, the available options to set are:
 *  - label: Show on the filter form and the list of applied filters. (Required)
 *  - type: The params type availables are https://github.com/pbeshai/use-query-params#param-types (Required)
 *  - inForm: define if the filter appear on filters form. (Optional)
 *  - toDisplay: override the filter value display when the filter is applied (Optional)
 *  - dependOn: string to represent other filter to depend this.
 */

 const FILTERS = {
    page: {
      label: 'Pagina',
      type: NumberParam,
      inForm: false
    },
    limit: {
      label: 'Tamaño de pagina',
      type: NumberParam,
      inForm: false
    },
    search: {
      label: 'Buscador',
      type: StringParam,
      inForm: false
    },
    ordering: {
      label: 'Orden',
      type: StringParam,
      inForm: false
    },
    first_name: {
      label: 'Nombre',
      type: StringParam,
      inForm: true
    },
    last_name: {
      label: 'Apellido',
      type: StringParam,
      inForm: true
    },
    date_joined: {
      label: 'Fecha de registro',
      type: CustomDateParam,
      inForm: true
    },
    date_joined_range_after: {
      label: 'Rango de recha de registro',
      type: DateRangeAfter,
      dependOn: 'date_joined_range_before',
      inForm: true
    },
    date_joined_range_before: {
      label: 'Rango de recha de registro',
      type: DateRangeBefore,
      dependOn: 'date_joined_range_after',
      inForm: true
    },
    id: {
      label: 'ID',
      type: NumberParam,
      inForm: false
    }
  };

export default FILTERS;