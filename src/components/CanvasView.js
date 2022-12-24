// import React, { useState, useEffect } from 'react';
import { fabric } from "fabric";
import axios from 'axios';
import { API_URL } from '../constants';

function CanvasView(props) {
    var canvas;

    function didLoad() {
        canvas = initCanvas()
    }

    function initCanvas() {
        canvas = new fabric.Canvas('sheet');
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = 10;

        selectRed();

        const layer = document.getElementById('base-layer').getBoundingClientRect();
        canvas.setWidth(layer.width);
        canvas.setHeight(layer.height);

        return canvas;
    }

    function homescreen() {
        props.setSelection()
    }

    function save(filename) {
        var img = canvas.toDataURL();
        var base64String = img.replace("data:", "").replace(/^.+,/, "");
        var name = filename + ".jpg"
        // console.log(base64String)
        if (props.item["id"] === props.item["base_layer_id"]) {
            upload(name, "_", base64String)
        } else {
            upload(name, props.item["id"], base64String)
        }
    }

    function upload(filename, parentname, filedata) {
        var formData = new FormData();
        formData.append("filename", filename);
        formData.append("parentname", parentname);
        formData.append("filedata", filedata);
        // console.log(formData)
        axios.post(API_URL + "art/upload", formData, {})
            .then(result => {
                console.log(result)
                homescreen()
            }).catch((err) => {
                console.log(err);
                alert("Upload img error: " + err.message);
            });
    }

    function create() {
        axios.post(API_URL + "art/", {
            "name": props.item["name"],
            "owner_id": 99,
            "base_layer_id": props.item["base_layer_id"]
        })
            .then(result => {
                console.log(result)
                save(result.data["id"])
            }).catch((err) => {
                console.log(err);
                alert("Create item error: " + err.message);
            });
    }

    function cancel() {
        homescreen()
    }

    function selectRed() {
        canvas.freeDrawingBrush.color = "#FF0000";
    }

    function selectGreen() {
        canvas.freeDrawingBrush.color = "#00FF00";
    }

    function selectBlue() {
        canvas.freeDrawingBrush.color = "#0000FF";
    }

    return (
        <div>
            <div className="flex-container">
                <div className="flex-draw">
                    <img className="under" id="base-layer" src={API_URL + "images/" + props.item["base_layer_id"] + ".jpg"} alt="" onLoad={didLoad}></img>
                    <img className="over" src={API_URL + "images/" + props.item["id"] + ".jpg"} alt=""></img>
                </div>
                <div>
                    <canvas id="sheet"></canvas>
                </div>
            </div>
            <div className="flex-toolbar">
                <button id="button-save" onClick={create}>Save</button>
                <button id="button-red" onClick={selectRed}>Red</button>
                <button id="button-green" onClick={selectGreen}>Green</button>
                <button id="button-blue" onClick={selectBlue}>Blue</button>
                <button id="button-cancel" onClick={cancel}>Cancel</button>
            </div>
        </div >
    )
}


export default CanvasView;