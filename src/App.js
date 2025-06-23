import { React, useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      <div className="App">
        <h1>Free Dictionary By Praveen</h1>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Enter a word to search its meaning"
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <button
            onClick={() => {
              getMeaning();
            }}
          >
            <FaSearch size="20px" />
          </button>
        </div>
        {data && (
          <div className="showResults">
            <h2>
              {data.word}{" "}
              <button
                onClick={() => {
                  playAudio();
                }}
              >
                <FcSpeaker size="26px" />
              </button>
            </h2>
            <h4>Parts of speech:</h4>
            <p>{data.meanings[0].partOfSpeech}</p>
            <h4>Definition:</h4>
            <p>{data.meanings[0].definitions[0].definition}</p>
            <h4>Example:</h4>
            <p>{data.meanings[0].definitions[0].example}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
