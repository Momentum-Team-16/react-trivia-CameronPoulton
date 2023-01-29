import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import shuffle from "lodash/shuffle";

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
      setCategories(response.data.trivia_categories);
    });
  }, []);

  const [selectedCat, setSelectedCat] = useState("");
  if (selectedCat) {
    console.log(selectedCat);
    return <CatQuestion selectedCat={selectedCat} />;
  }
  return (
    <section>
      <h1>React Trivia</h1>
      <ul className="category-grid">
        {categories.map((categories) => (
          <li
            onClick={() => setSelectedCat(categories.id)}
            className="category"
            key={categories.id}
          >
            {categories.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
function CatQuestion({ selectedCat }) {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=1&category=${selectedCat}`)
      .then((response) => {
        setQuestion(
          response.data.results.map((obj) => ({
            question: he.decode(obj.question),
            correct_answer: he.decode(obj.correct_answer),
            answerChoice: shuffle([
              obj.correct_answer,
              ...obj.incorrect_answers,
            ]),
          }))
        );
      });
  }, [selectedCat]);
  return (
    <div className="question">
      {question.map((questObj) => (
        <div key={selectedCat}>
          <p>{he.decode(questObj.question)}</p>
          <ul className="questions">
            {questObj.answerChoice.map((answerObj) => (
              <li onClick={() => setAnswer(he.decode(answerObj))} className="category">
                {he.decode(answerObj)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default App;
