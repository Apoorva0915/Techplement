import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [showRandom, setShowRandom] = useState(true);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.quotable.io/quotes')
      .then((res) => setQuotes(res.data.results))
      .catch((err) => console.log(err.message));

    fetchRandomQuote(); // Fetch initial random quote
  }, []);

  const fetchRandomQuote = () => {
    axios
      .get('https://api.quotable.io/random')
      .then((res) => setRandomQuote(res.data))
      .catch((err) => console.log(err.message));
  };

  const handleSearch = () => {
    const filteredQuotes = quotes.filter(
      (quote) =>
        quote.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAuthorQuotes(filteredQuotes.slice(0, 3));
    setShowRandom(false);
  };

  const handleRandom = () => {
    fetchRandomQuote(); // Fetch a new random quote
    setShowRandom(true);
  };

  const addToFavourites = (quote) => {
    setFavourites([...favourites, quote]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ background: 'linear-gradient(to bottom right, #ff9472, #ffc75f)' }}>
      <h1 className="text-6xl font-extrabold text-white mb-8 tracking-wider uppercase">Q<span className="text-yellow-700">uo</span>tify</h1>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg backdrop-blur-md backdrop-filter bg-opacity-30">
        <input
          type="text"
          placeholder="Search by author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500 rounded-lg"
        />
        <div className="flex mb-4">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={handleRandom}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Random
          </button>
        </div>
        {showRandom ? (
          randomQuote && (
            <Card quote={randomQuote} addToFavourites={addToFavourites} className="mt-5" />
          )
        ) : (
          Array.isArray(authorQuotes) && authorQuotes.length !== 0 && (
            <div className="mt-5">
              {authorQuotes.map((quote, i) => {
                return <Card quote={quote} addToFavourites={addToFavourites} key={i} />;
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
