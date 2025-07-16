import React from 'react';
import './RecipeCard.css';


const RecipeCard = ({ recipe }) => {

    //getting number of calories from the recipe object
     const calories = recipe.nutrition?.nutrients?.find(
    (nutrient) => nutrient.name === 'Calories'
  )?.amount;
    const roundedCalories = Math.round(calories);

    const cuisine = recipe.cuisines?.[0] || 'Unknown';


    return(
        <div className="recipe-row">
            <div className="cell">{recipe.title}</div>
            <div className="cell">{recipe.readyInMinutes} mins</div>
            <div className="cell">{cuisine}</div>
            <div className="cell">{roundedCalories ? `${roundedCalories} kcal` : 'N/A'}</div>
        </div>    
    )
}

export default RecipeCard;