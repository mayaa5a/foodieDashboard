import React from 'react';
import {useState, useEffect} from 'react';
import RecipeCard from './RecipeCard.jsx';
import './RecipeDashboard.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import RecipeDetail from './RecipeDetail.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const RecipeDashboard = () => {
  
    console.log("RecipeDashboard is rendering");
    //recipe object array 
    const [recipes, setRecipe] = useState([]);
    const randomOffset = Math.floor(Math.random() * 100);
    const [searchQuery, setSearchQuery] = useState('');
    const [calorieRange, setCalorieRange] = useState([0, 1000]);
    const [timeRange, setTimeRange] = useState([0, 120]);
    const [selectedCuisine, setSelectedCuisine] = useState('All');

    const filteredRecipes = recipes.filter((recipe) => {
  const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

  const calories = recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0;
  const calorieMatch = calories >= calorieRange[0] && calories <= calorieRange[1];

  const timeMatch = recipe.readyInMinutes >= timeRange[0] && recipe.readyInMinutes <= timeRange[1];

  const cuisine = recipe.cuisines?.[0] || 'Unknown';
  const cuisineMatch = selectedCuisine === 'All' ||  cuisine.toLowerCase() === selectedCuisine.toLowerCase();

  return titleMatch && calorieMatch && timeMatch && cuisineMatch;
});


    useEffect(() => {

        const fetchRecipe = async () => {
            const apiKey = '92607ffbdaf8491297ebe41bb2faa55c';
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=10&offset=${randomOffset}&addRecipeNutrition=true&apiKey=${apiKey}`
                );
            const data = await response.json();
            setRecipe(data.results);      
        };

        fetchRecipe();
    }, []);


    //organizing data 
    const totalRecipes = recipes.length;
    const averagePrepTime = recipes.length
    ? Math.round(recipes.reduce((sum, r) => sum + (r.readyInMinutes || 0), 0) / recipes.length)
    : 0;
    const averageCalories = recipes.length
    ? Math.round(recipes.reduce((sum, r) => {
        const cal = r.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0;
        return sum + cal;
        }, 0) / recipes.length)
    : 0;


    //for chart data 
    const cuisineData = [...new Set(recipes.flatMap(r => r.cuisines))].map((cuisine) => {
  const filtered = recipes.filter(r => r.cuisines?.includes(cuisine));
  const avgCalories = Math.round(
    filtered.reduce((sum, r) =>
      sum + (r.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0), 0
    ) / filtered.length
  );
  return { cuisine, avgCalories };
});

const prepTimeData = [
  { range: '0-15', count: recipes.filter(r => r.readyInMinutes <= 15).length },
  { range: '16-30', count: recipes.filter(r => r.readyInMinutes > 15 && r.readyInMinutes <= 30).length },
  { range: '31-60', count: recipes.filter(r => r.readyInMinutes > 30 && r.readyInMinutes <= 60).length },
  { range: '60+', count: recipes.filter(r => r.readyInMinutes > 60).length },
];




    return(
    <div className="layout-container">
       <Sidebar />
        


    <div className="dashboard-container">

        <div className="stats-container">
  <div className="stat-box">
    <h3>{totalRecipes}</h3>
    <p>Total Recipes</p>
  </div>
  <div className="stat-box">
    <h3>{averagePrepTime} mins</h3>
    <p>Avg Prep Time</p>
  </div>
  <div className="stat-box">
    <h3>{averageCalories} kcal</h3>
    <p>Avg Calories</p>
  </div>
</div>


  <div className="chart-container">
    <p>Cuisine Data</p>
    <ResponsiveContainer width="60%" height={300}>
  <BarChart data={cuisineData}>
    <XAxis dataKey="cuisine" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="avgCalories" fill="#FED8B1" />
  </BarChart>
</ResponsiveContainer>

<p>Prep Time Distribution</p>
<ResponsiveContainer width="60%" height={300}>
  <BarChart data={prepTimeData}>
    <XAxis dataKey="range" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count" fill="#FED8B1" />
  </BarChart>
</ResponsiveContainer>
</div> 



 

        <div className="filter-bar">
  <input
    id="search-bar"
    type="text"
    placeholder="Search recipes..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <div>
    <label>Calorie Range:</label>
    <input
      type="number"
      value={calorieRange[0]}
      onChange={(e) => setCalorieRange([+e.target.value, calorieRange[1]])}
      placeholder="Min"
    />
    <input
      type="number"
      value={calorieRange[1]}
      onChange={(e) => setCalorieRange([calorieRange[0], +e.target.value])}
      placeholder="Max"
    />
  </div>

  <div>
    <label>Prep Time Range:</label>
    <input
      type="number"
      value={timeRange[0]}
      onChange={(e) => setTimeRange([+e.target.value, timeRange[1]])}
      placeholder="Min"
    />
    <input
      type="number"
      value={timeRange[1]}
      onChange={(e) => setTimeRange([timeRange[0], +e.target.value])}
      placeholder="Max"
    />
  </div>

  <select id="cuisine-dropdown" value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
  <option value="All">All Cuisines</option>
  <option value="African">African</option>
  <option value="Asian">Asian</option>
  <option value="American">American</option>
  <option value="British">British</option>
  <option value="Cajun">Cajun</option>
  <option value="Caribbean">Caribbean</option>
  <option value="Chinese">Chinese</option>
  <option value="Eastern European">Eastern European</option>
  <option value="European">European</option>
  <option value="French">French</option>
  <option value="German">German</option>
  <option value="Greek">Greek</option>
  <option value="Indian">Indian</option>
  <option value="Irish">Irish</option>
  <option value="Italian">Italian</option>
  <option value="Japanese">Japanese</option>
  <option value="Jewish">Jewish</option>
  <option value="Korean">Korean</option>
  <option value="Latin American">Latin American</option>
  <option value="Mediterranean">Mediterranean</option>
  <option value="Mexican">Mexican</option>
  <option value="Middle Eastern">Middle Eastern</option>
  <option value="Nordic">Nordic</option>
  <option value="Southern">Southern</option>
  <option value="Spanish">Spanish</option>
  <option value="Thai">Thai</option>
  <option value="Vietnamese">Vietnamese</option>
</select>

</div>




     

      <div className="dashboard-header">
        <div className="column-title">Recipe Name</div>
        <div className="column-title">Prep Time</div>
        <div className="column-title">Cuisine</div>
        <div className="column-title">Calories</div>
      </div>

      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
     </div>
  );

}

export default RecipeDashboard;