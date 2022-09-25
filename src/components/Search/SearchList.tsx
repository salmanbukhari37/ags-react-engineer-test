import React from 'react'
import Listing from './Listing'

const SearchList = ({ listItems } : any) => {
    return (
      <>
            <div>{listItems.length} Suggestions</div>
            <Listing listItems={listItems} />
      </>
  )
}
export default SearchList;
