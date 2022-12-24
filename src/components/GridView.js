import React, { useState, useEffect } from 'react';
import CellView from './CellView';
import axios from 'axios';
import { API_URL } from '../constants';

function GridView(props) {
    const [getItems, setItems] = useState([])

    useEffect(() => {
        get()
    }, []);

    let itemList = getItems.map((item) => {
        return <CellView key={item["id"]} item={item} setSelection={props.select} />
    })

    function get() {
        axios.get(API_URL + "art/row/")
            .then(result => {
                // console.log(result.data)
                setItems(result.data)
            }).catch((err) => {
                console.log(err);
                alert("Get error: " + err.message);
            });
    }

    return (
        <div>
            <div className="title">
                Welcome you stinkin' Vandal
            </div>
            <div className="heading">
                Choose the beauty you wish to distroy
            </div>
            <div className="flex-container">
                {itemList}
            </div>
        </div>

    );
}

export default GridView;