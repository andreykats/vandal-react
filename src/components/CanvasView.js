import { fabric } from "fabric";
import axios from 'axios';
import { API_IMAGES, API_SUBMIT } from '../constants';

function CanvasView(props) {
    var canvas;

    function didLoad() {
        canvas = initCanvas()
    }

    function initCanvas() {
        canvas = new fabric.Canvas('canvas-sheet');
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = 10;

        selectRed();

        // Set canvas size based on the size of the base_layer image
        const layer = document.getElementById('base-layer').getBoundingClientRect();
        canvas.setWidth(layer.width);
        canvas.setHeight(layer.height);

        return canvas;
    }

    function homescreen() {
        props.setSelection()
    }

    function submitImage() {
        // Create a binary string from canvas
        var img = canvas.toDataURL();
        var base64String = img.replace("data:", "").replace(/^.+,/, "");

        // Create a form and populate fields
        var formData = new FormData();
        formData.append("item_id", props.item["id"]);
        formData.append("user_id", 99);
        formData.append("image_data", base64String);

        // Perform request
        axios.post(API_SUBMIT, formData, {})
            .then(result => {
                console.log(result)
                homescreen()
            }).catch((err) => {
                console.log(err);
                alert("Upload img error: " + err.message);
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
                    <img className="under" id="base-layer" src={API_IMAGES + props.item["base_layer_id"] + ".jpg"} alt="" onLoad={didLoad}></img>
                    <img className="over" src={API_IMAGES + props.item["id"] + ".jpg"} alt=""></img>
                </div>
                <div>
                    <canvas id="canvas-sheet"></canvas>
                </div>
            </div>
            <div className="flex-toolbar">
                <button id="button-save" onClick={submitImage}>Save</button>
                <button id="button-red" onClick={selectRed}>Red</button>
                <button id="button-green" onClick={selectGreen}>Green</button>
                <button id="button-blue" onClick={selectBlue}>Blue</button>
                <button id="button-cancel" onClick={cancel}>Cancel</button>
            </div>
        </div >
    )
}


export default CanvasView;