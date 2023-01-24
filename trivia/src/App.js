import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((response) =>{ 
      setCategories(response.data.trivia_categories);
    });
  }, [])


  return (
    <section>
      <header>
        <h1>Trivia</h1>
      </header>
      <div className="trivia-container">
          { categories.map(category => (
            <li> {category.id} : {category.name}</li>
          ))}
      </div>
    </section>
  );
  }

export default App;