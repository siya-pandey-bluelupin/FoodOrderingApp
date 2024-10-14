import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import ErrorPage from './ErrorPage';

const requestConfig = {};
const Meals = () => {



  const { data: loadedMeals,
    isLoading,
    error } = useHttp(`${import.meta.env.VITE_API_URL}/meals`, requestConfig, []);
  if (isLoading) {
    return <p className='center'>Fetching meals......</p>
  }
  if(error){
    return<ErrorPage title="Failed to fetch meals "message={error}/>
  }
  return (
    <ul id='meals'>

      {loadedMeals.map((meal) =>
        <MealItem  key={meal.id} meal={meal} />
        )}
    </ul>
  )
}

export default Meals