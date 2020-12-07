import STATES from "./state";

export const FILTER_TYPES = {
    SELECT: "SELECT",
    SELECT_ARRAY: "SELECT_ARRAY",
    TEXT: "TEXT",
    NONE: "NONE"
}

export const SORT_TYPE = {
    ASC: "ASC",
    DESC: "DESC",
    NONE: "NONE"
}

export const FIELD_NAME = {
    NAME: "name",
    CITY: "city",
    STATE: "state",
    PHONE_NUMBER: "telephone",
    GENRE: "genre"
};

export const TABLE_COLUMNS = [
    {field: FIELD_NAME.NAME, name: "Restaurant Name", searchable:true, filter: FILTER_TYPES.NONE, sort: SORT_TYPE.ASC},
    {field: FIELD_NAME.CITY,name: "City", searchable:true,filter: FILTER_TYPES.TEXT, sort: SORT_TYPE.NONE , sort: SORT_TYPE.ASC},
    {field: FIELD_NAME.STATE, name:"State", searchable:true, filter: FILTER_TYPES.SELECT, sort: SORT_TYPE.ASC, getDisplayValue: (code) => {
        return STATES[code]
    }},
    {field: FIELD_NAME.PHONE_NUMBER, name: "Phone Number", searchable:true, filter: FILTER_TYPES.NONE, sort: SORT_TYPE.NONE},
    {field: FIELD_NAME.GENRE, name: "Genre" ,searchable:true, filter: FILTER_TYPES.SELECT_ARRAY, sort: SORT_TYPE.NONE, getDisplayValue: (genres) => {
        return genres.join(", ")
    }},
]

export function filterByFilterType(record, filter) {
    if(filter.filterType === FILTER_TYPES.SELECT_ARRAY) {
        return !!record[filter.name].find(field => field.toLowerCase().includes(filter.value.toLowerCase()));
    } else if(filter.filterType === FILTER_TYPES.SELECT) {
        return record[filter.name].toLowerCase().includes(filter.value.toLowerCase());
    }
    return record[filter.name].toLowerCase().includes(filter.value.toLowerCase());
}