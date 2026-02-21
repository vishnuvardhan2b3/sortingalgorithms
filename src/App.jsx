import { Link, Route, Routes } from "react-router-dom";
import SelectionSortStepControl from "./SelectionSortStepControl";
import BubbleSortStepControl2 from "./BubbleSortStepControl2.jsx";
import InsertionSort from "./InsertionSort.jsx"
import Home from "./Home.jsx";
export default function App()
{
  return (
    <div>
      <h1>Sorting Algorithms</h1>
      <ul>
        <Link to="/sel"><li>selection Sort</li></Link>
        <Link to='/bub'><li>Bubble Sort</li></Link>
        <Link to="/ins"><li>Insertion Sort</li></Link>
      </ul>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sel' element={<SelectionSortStepControl/>}></Route>
        <Route path='/bub' element={<BubbleSortStepControl2/>}></Route>
        <Route path='/ins' element={<InsertionSort/>}></Route>
      </Routes>
    </div>
  )
}