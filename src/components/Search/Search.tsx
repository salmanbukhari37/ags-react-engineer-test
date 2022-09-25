import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchList from './SearchList';
import axios from 'axios';

//style design search box middle of the page
const SearchStyle = styled.input`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`;
//full width of search bar



export const Search = () => {
    //fetch data from api using axios
 
   

    const [search, setSearch] = useState('');
    const [listItems, setListItems] = useState([]);
    //list of items to search
    const [searchList, setSearchList] = useState([]);
    useEffect(() => {
       
        axios.get(`https://62d7f6869088313935880018.mockapi.io/api/v1/catalogue`)
            .then(res => {
                const results = res.data;
                
                setListItems(results);
            })
        
    }, []);
    // console.log(listItems)
    //search function
    const handleChange = (e: any) => {
        setSearch(e.target.value);
        //order by searchCount
        if (e.target.value.length > 0) {
            //search match percentage based on sku number each percentage is 25%
            
            const filteredList = listItems.filter((item: any) => {
                let percent = 0;

                const regex = new RegExp(`${e.target.value}`, 'i');
                item.matchPercent = percent;
                if (e.target.value.includes('-')) {
                    const inputVal = e.target.value.split('-');
                    const skuMatch = inputVal.filter((sku: any) => {
                        if (sku) {
                            const skuRegex = new RegExp(`${sku}`, 'i');
                            return item.sku.match(skuRegex)
                        } else {
                            return false;
                        }
                    })
                    
                    item.matchPercent = skuMatch.length * 25;
                    return item
                }
                return item.brand.match(regex) || item.model.match(regex) || item.sku.match(regex);
            });
            filteredList.sort((a: any, b: any) => b.searchCount - a.searchCount);
            filteredList.sort((a: any, b: any) => b.matchPercent - a.matchPercent);
            setSearchList(filteredList.slice(0, 10));
        } else {
            setSearchList([]);
        }
    };
   
    return (    
        <>
            <h1>Find a Product</h1>
            <SearchStyle
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
            />
            <SearchList listItems={searchList}  /> 
        </>
    );
}
