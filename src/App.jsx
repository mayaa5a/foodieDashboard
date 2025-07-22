import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RecipeDashboard from './RecipeDashboard.jsx';
import RecipeDetail from './RecipeDetail.jsx';

const App = () => {

console.log("App is rendering");

  return (
    <Router>
    <div className="App">
      <header className="app-header">
        <h1>Foodie Dashboard</h1>
        <h1 id="food-line">🍓🍣🍝🍤🍧</h1>
      </header>

      

      <Routes>
        <Route path="/" element={<RecipeDashboard/>} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
         <Route path="*" element={<p>Fallback route hit</p>} />
      </Routes>   
    </div>
    </Router>
  )
}

export default App
