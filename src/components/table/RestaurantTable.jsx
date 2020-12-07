import React, {useState, useEffect} from 'react';
import './RestaurantTable.css'
import { SORT_TYPE, FILTER_TYPES, filterByFilterType } from '../../constants/restaurrantsConstant';
import Loader from '../Loader/Loader';

function RestaurantTable(props) {
    const {columns, data, perPageRecord, defaultSort, isLoading} = props;
    
    const [pageNumber, setPageNumber] = useState(0);
    const [filterData, setFilterData] = useState(data);
    const [searchText, setSearchText] = useState('');
    const [filters, setFilter] = useState([]);
    const [isFilterEnabled, setFilterEnabled] = useState(true);
    const [records, setSelectedRecords] = useState([]);
    const [sortBy, setSortBy] = useState(defaultSort);

    useEffect(() => {
        setSelectedRecords([...filterData].splice((pageNumber-1)*perPageRecord, perPageRecord ))
    }, [pageNumber]);
    useEffect(() => {
        const filterData = getFilteredRecords(filters, searchText);
        setPageNumber(1) 
        let records = filterData.sort((a,b) =>  a[sortBy.field].localeCompare(b[sortBy.field])); 
        if(sortBy.order === SORT_TYPE.DESC) {
            records= records.reverse()
        } 
        setFilterData(records);
        setSelectedRecords([...records].splice((pageNumber-1)*perPageRecord, perPageRecord))     
    }, [filters, searchText, sortBy, isFilterEnabled]);
    useEffect(() => {
        if(!isLoading) {
            const filterData = data.sort((a,b) =>  a[sortBy.field].localeCompare(b[sortBy.field]));
            setPageNumber(1);
            setFilterData(filterData);   
            setSelectedRecords([...filterData].slice(0, perPageRecord));   
        }    
    }, [isLoading])
    const  onSortChange = (column) =>{
        if(column.field === sortBy.field) {
            sortBy.order= sortBy.order === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC;
        } else {
            sortBy.field = column.field;
            sortBy.orer = SORT_TYPE.ASC;
        }
        setSortBy({...sortBy});
    }
    const getFilteredRecords =() => {
        const filteredData = isFilterEnabled ?  data.filter(record => {
            return filters.every(filter => {
                
                return filter.value ? filterByFilterType(record, filter): true;
            })
        }): data;

        return searchText ? filteredData.filter(record => {
            const searchableColumns = columns.filter(column => column.searchable);
            return searchableColumns.some(column => {
                const newRecord = {...record};
                if(column.filter === FILTER_TYPES.SELECT && column.getDisplayValue) {
                    newRecord[column.field] = `${newRecord[column.field]}${column.getDisplayValue(newRecord[column.field])}` 
                }
                return filterByFilterType(newRecord, {filterType: column.filter, name: column.field, value: searchText});
            })
        }): filteredData;
    }
    const  onFilterChange = (event, column) =>{
        const value = event.target.value;
        const filter =  filters.find(filter => filter.name === column.field);
        if(filter) {
            filter.value = value;   
        } else {
            filters.push({name: column.field, value, filterType: column.filter })
        }
        setFilter([...filters])
    }
  return (
    <div className="table-container">
    <div className="search_box">
        <div className="search_container">
        <input type="text" placeholder="Search" className="search" onChange={e => setSearchText(e.target.value)}/>
        <input type="checkbox" placeholder="Search" id="disableFilter" className="disable_filter" onChange={e => 
            {
                setFilterEnabled(!e.target.checked)}
            }/>
        <label for="disableFilter"> Disable Filter</label>
        </div>
    </div>
    <div className="table_section">
    {isLoading && <Loader/>}
        <table className="zebra">
            <thead>
                <tr>
                    {columns.map(column => {
                       return  <th key={column.field}>
                       {column.name}
                        {column.sort !== SORT_TYPE.NONE && <img onClick ={() => {onSortChange(column)}}className="sort_icon" src="sort-arrows.svg"/>}
                         </th>
                    })}
                </tr>
                <tr className="filter">
                    {columns.map(column => {
                        if(column.filter === FILTER_TYPES.TEXT) {
                            return  <td><input type="text" placeholder="" disabled={!isFilterEnabled}  onChange={e => onFilterChange(e, column)} /></td>
                        } else if(column.filter === FILTER_TYPES.SELECT) {
                            const options =  [...new Set(data.map(restaurant => {
                                return restaurant[column.field]
                           }))]; 
                            return <td><select disabled={!isFilterEnabled} onChange={e => onFilterChange(e, column)}>
                                <option value=''>All</option>
                                {options.map( option => {
                                    return <option value={option}>{column.getDisplayValue ? column.getDisplayValue(option): option}</option>
                                })}
                            </select></td>
                        }else if(column.filter === FILTER_TYPES.SELECT_ARRAY) {
                            const options =  [...new Set(data.reduce((list,restaurant) => {
                                 list = [...list,...restaurant[column.field]]
                                 return list;
                           }, []))]; 
                            return <td><select disabled={!isFilterEnabled} onChange={e => onFilterChange(e, column)}>
                                <option value=''>All</option>
                                {options.map( option => {
                                    return <option value={option}>{option}</option>
                                })}
                            </select></td>
                        } 
                        else {
                            return  <td><input type="text" placeholder="" disabled/></td>
                        }
                    })}
                   
                </tr>
            </thead>
            <tbody>
                
                    {!!records.length && records.map(row => {
                        return (<tr key={row.id}>
                            {columns.map(column => {
                                return  <td>{column.getDisplayValue ? column.getDisplayValue(row[column.field]) : row[column.field]}</td>
                            })}
                        </tr>)
                    })}
                    {!records.length && !isLoading &&  <tr><td colSpan="5" className="empty-result">
                        <b>No Result Found</b>
                    </td>
                </tr>}
                    
            </tbody>
        </table>
    </div>
    <div className="table_pagination">
        <div className="pagination_drop_down">
            Total: <b>{filterData.length}</b>
        </div>
        <div className="pagination_list">
            <ul className="pagination">
                {
                    new Array(Math.ceil(filterData.length/perPageRecord)).fill(0).map((val, index) => {
                        return (<li onClick={() =>setPageNumber(index+1)}className={index+1 === pageNumber ? "active": ''}>
                            <a href="#">{index+1}</a>
                        </li>);
                    })
                }
            </ul>
        </div>
    </div>
</div>
  );
}
export default RestaurantTable;