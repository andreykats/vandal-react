
import React, { useState } from "react";
import CanvasView from './components/CanvasView';
import GridView from './components/GridView';
import RowView from './components/RowView';
import CellView from './components/CellView';
import './App.css';

function App() {
  const [getSelectedItem, setSelectedItem] = useState(null)
  const [getView, setView] = useState({ view: 1 })

  function selectedHome() {
    setSelectedItem(null)
    setView({ view: 1 })
  }

  function selectedRow(item) {
    setSelectedItem(item)
    setView({ view: 2 })
  }

  function selectedCell(item) {
    setSelectedItem(item)
    setView({ view: 3 })
  }

  function selectedNew(item) {
    setSelectedItem(item)
    setView({ view: 4 })
  }

  return (
    <div>
      <div>
        {
          getView.view === 1 ? <GridView select={selectedRow} /> :
            getView.view === 2 ? <RowView item={getSelectedItem} onSelectCell={selectedCell} onSelectNew={selectedNew} onSelectCancel={selectedHome} /> :
              getView.view === 3 ? <CellView item={getSelectedItem} setSelection={selectedHome} /> :
                getView.view === 4 ? <CanvasView item={getSelectedItem} setSelection={selectedHome} /> : ''
        }
      </div>
    </div>

  )
}

export default App;
