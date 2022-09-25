import React from 'react'
//style component for search list
import styled from 'styled-components';
//list container and rows
const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
//list item
const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
    &:hover {
        background-color: #eee;
    }
`;
//style for column
const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    padding: 0 10px;
`;

const Listing = ({ listItems }: any) => {
    return (
        <>
            {listItems.length === 0 && <div><strong>No items available</strong></div>}
            <ListContainer>
                {listItems.map((item: any) => (
                    <ListItem key={item.id}>
                        <Column>{item.brand} {item.model}</Column>
                        <Column>{item.capacity} GB / {item.color}</Column>
                        <Column>{item.sku}</Column>
                        <Column>$ {item.price.toFixed(2)}</Column>
                        <Column>{item.matchPercent}</Column>
                    </ListItem>
                ))}
            </ListContainer>
        </>
    )
}
export default Listing