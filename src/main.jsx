import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BubbleSortVideoStyle from './BubbleSortVideoStyle.jsx'
import BubbleSortStepControl from './BubbleSortStepControl.jsx'
import BubbleSortStepControl2 from './BubbleSortStepControl2'
import SelectionSortStepControl from './SelectionSortStepControl.jsx'
import InsersionSort from './InsertionSort.jsx'
import UseStateExample from './UseStateExample.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
