import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CellView from './CellView';
import { API_URL } from '../constants';

function RowView(props) {
    const [getItems, setItems] = useState([])

    useEffect(() => {
        get(props.item["base_layer_id"])
    }, [props.item["id"]]);

    let itemList = getItems.map((item) => {
        return <CellView key={item["id"]} item={item} setSelection={props.onSelectCell} />
    })

    function get(id) {
        console.log("request: " + id)
        axios.get(API_URL + "art/feed/" + id)
            .then(result => {
                console.log(result.data)
                setItems(result.data)
            }).catch((err) => {
                console.log(err);
                alert("Get error: " + err.message);
            });
    }

    return (
        <div>
            <div className="title">
                Decided to distroy "{props.item["name"]}", eh?
            </div>
            <div className="heading">
                You monster
            </div>
            <div className="flex-row">
                <div className="flex-child">
                    <button id="button-new" onClick={() => props.onSelectNew(props.item)}> NEW </button>
                </div>
                {itemList}
            </div>

        </div>

    );
}

export default RowView;