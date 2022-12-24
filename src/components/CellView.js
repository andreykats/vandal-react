import { API_URL } from '../constants';

function CellView(props) {
    if (props.item["id"] === props.item["base_layer_id"]) {
        return (
            <div className="cell-single" onClick={() => props.setSelection(props.item)}>
                <img id="img" src={API_URL + "images/" + props.item["base_layer_id"] + ".jpg"} alt="" />
            </div>
        )
    } else {
        return (
            <div className="cell-stack" onClick={() => props.setSelection(props.item)} >
                <img className="under" id="img" src={API_URL + "images/" + props.item["base_layer_id"] + ".jpg"} alt="" />
                <img className="over" id="img" src={API_URL + "images/" + props.item["id"] + ".jpg"} alt="" />
            </div>
        )
    }
}

export default CellView;