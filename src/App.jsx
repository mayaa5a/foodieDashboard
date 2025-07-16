import { useState } from 'react'
import './App.css'
import RecipeDashboard from './RecipeDashboard.jsx';

const App = () => {

  return (
    <div className="App">
      <header className="app-header">
        <h1>Foodie Dashboard</h1>
        <h1 id="food-line">🍓🍣🍝🍤🍧</h1>
      </header>

      <RecipeDashboard />
      
      
    </div>
  )
}

export default App
