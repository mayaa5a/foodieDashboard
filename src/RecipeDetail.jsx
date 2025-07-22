import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const RecipeDetail = () => {
  console.log("RecipeDetail mounted");
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const apiKey = '92607ffbdaf8491297ebe41bb2faa55c';
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`
      );
      const data = await res.json();
      setRecipe(data);
    };

    fetchDetail();
  }, [id]);

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="detail-page">
      <div className="dashboard-layout">
        <Sidebar />
        <main className="detail-content">
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.summary?.replace(/<[^>]+>/g, '')}</p>
          <p>Ready in: {recipe.readyInMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
          <p>Health Score: {recipe.healthScore}</p>
        </main>
      </div>
    </div>
  );
};

export default RecipeDetail;
