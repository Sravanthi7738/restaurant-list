import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchRestaurants} from '../actions/restaurants';
import RestaurantTable from '../components/table/RestaurantTable';
import './Restaurant.css';
import { TABLE_COLUMNS, FIELD_NAME, SORT_TYPE } from '../constants/restaurrantsConstant';
function Restaurant(props) {
    const DEFAULT_SORTBY =  {field: FIELD_NAME.NAME, order: SORT_TYPE.ASC};
    useEffect(() => {
      props.fetchRestaurants();
    }, [])
   const {isLoading, restaurants} = props;
    return (
      <div className="Restaurant">

     <RestaurantTable data={restaurants} isLoading={isLoading} columns={TABLE_COLUMNS} perPageRecord = {10} defaultSort ={DEFAULT_SORTBY}/>
      </div>
    );
  }

const mapStateToProps = (store) => {
    return  {
      restaurants: store.restaurants.list,
      isLoading: store.restaurants.isLoading
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchRestaurants: () => dispatch(fetchRestaurants())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
  