import React from 'react';

const Card = ({ quote, className }) => {
  return (
    <div className={`bg-white mb-5 px-5 py-5 rounded shadow-md ${className}`}>
      <p className="text-lg text-gray-800 mb-4">{quote.content}</p>
      <p className="text-gray-600 text-sm">
        {quote.author} |{' '}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${quote.content} - ${quote.author}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Tweet
        </a>
      </p>
    </div>
  );
};

export default Card;
