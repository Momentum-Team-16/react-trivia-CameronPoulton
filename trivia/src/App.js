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
    return <CatQuestion selectedCat={selectedCat} />;
  }
  return (
    <section>
      <h1>React Trivia</h1>
      <ul className="category-grid">
        {categories.map((categories) => (
          <li onClick={() => setSelectedCat(categories.id)}
            className="category"
            key={categories.id}>{categories.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CatQuestion({ selectedCat, setSelectedCat }) {
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5&category=${selectedCat}`)
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
    question.length > 0 && (
      <Question question={question} index={index} setIndex={setIndex} setSelectedCat={setSelectedCat}/>
    )
  )

  function Question({ question, index, setIndex, }) {
    
    function handleClick() {
      if (answer === question[index].correct_answer) {
        console.log("correct")
      }
      // if (answer === question[index].incorrect_answers)
      //   console.log("you suck")
      // setIndex(index+1)
      }
      return (
        <section className="question">
          <h1 key={index}>
            
              {question[index].question}
            </h1>

          <ul className="answers"> 
            {question[index].answerChoice.map((answer) => (
              <li onClick={() => setAnswer(he.decode(answer))} key={answer}>
                {he.decode(answer)}
              </li>

            ))}
          </ul>
            <button onClick={() => handleClick()}>Check Answer</button> 
          
        </section>
  )}
}
  export default App;
