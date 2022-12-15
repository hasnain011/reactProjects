import React, { useState } from 'react'
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOp, GEO_API_URL } from '../../api';

const Search = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);
  
//   Set Search Data from input search bar throughn function
  const handlechange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

  }
  
  
//   load options for searching different cities ( dropdown options)
  const loadOptions = (inputValues)=>{

    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValues}`, GeoApiOp)
	.then(response => response.json())
	.then((response) => {
        return {
            options: response.data.map((city) =>{
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}  ${city.countryCode}`,
                   
                }
            })
    
        }
    })
	.catch(err => console.error(err));
  }


  return (
    <div>
      <AsyncPaginate
      placeholder= "search for city"
      debounceTimeout={600}
      value={search}
      onChange={handlechange}
      loadOptions={loadOptions}
      />
    </div>
  )
}

export default Search
