import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import he from "he"

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
    return <CatQuestion selectedCat={selectedCat}/>
  }
  return (
    <section>
      <header>
        <h1>React Trivia</h1>
      </header>
        <ul className="category-grid">
          {categories.map((categories) => (
            <li
              onClick={() => setSelectedCat(categories.id)}
              className="category" key={categories.id}>{categories.name}
            </li>
          ))}
        </ul>
    </section>
  );
}
function CatQuestion({ selectedCat }) {
  const [question, setQuestion] = useState([])
  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=1&category=${selectedCat}`)
      .then((response) => {setQuestion(response.data.results)
    })
  }, [selectedCat])
  console.log(question)
return (
  <section className="question">
    {question.map((questObj) => (
      <div key={selectedCat}>
        <p>{he.decode(questObj.question)}</p>
      </div>
    ))}
  </section>
)
}
export default App;