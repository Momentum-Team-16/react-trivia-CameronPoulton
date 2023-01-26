import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Category />
    </div>
  );
}

function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      setCategories(response.data.trivia_categories)
    })
  }, [])

  const [selectedCat, setSelectedCat] = useState("")
  if (selectedCat) {
    console.log(selectedCat)
    // return <CatQuestion />
  }

  return (
    <section>
      <header>
        <h1>Trivia</h1>
      </header>

      <div className="category-list">
        <ul className="category-grid">
          {categories.map((categories) => (
            <li
              onClick={() => setSelectedCat(categories.name)}
              className="category" key={categories.id}>{categories.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// function CatQuestion(selectedCat) {
//   const [question, setQuestion] = useState([])
//   useEffect(() => {
//     axios
//       .get(
//         `https://opentdb.com/api.php?amount=10`)
//       .then((response) => {setQuestion(response.data.results.map(obj => [obj.question, obj.incorrect_answer, obj.correct_answer]))
//       })
//   }, [selectedCat]);


// }
export default App;