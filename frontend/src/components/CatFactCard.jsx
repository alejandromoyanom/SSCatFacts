import React, { useState } from "react";
import { getExternalCatFact, likeCatFact } from "../services/api";

function CatFactCard({ userId, onFactLiked }) {
  const [currentFact, setCurrentFact] = useState(null);
  const [message, setMessage] = useState("");

  const fetchNewFact = async () => {
    setMessage("");
    try {
      const data = await getExternalCatFact();
      setCurrentFact(data.fact);
    } catch (error) {
      setMessage("Error al obtener el fact del gato.");
      console.error(error);
    }
  };

  const handleLikeFact = async () => {
    setMessage("");
    if (!userId) {
      setMessage('Debes iniciar sesión para marcar un fact como "me gusta".');
      return;
    }
    if (!currentFact) {
      setMessage('Primero obtén un fact para poder "likearlo".');
      return;
    }

    try {
      const data = await likeCatFact(userId, currentFact);
      setMessage(data.message);
      onFactLiked();
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error al marcar como "me gusta".'
      );
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Cat Fact
      </h2>
      {currentFact ? (
        <p className="text-gray-700 text-lg mb-4 text-center">{currentFact}</p>
      ) : (
        <p className="text-gray-500 text-center">
          Haz click en "Obtener Fact" para ver uno.
        </p>
      )}

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={fetchNewFact}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Obtener Fact 🐱
        </button>
        <button
          onClick={handleLikeFact}
          disabled={!currentFact || !userId}
          className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !currentFact || !userId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700 text-white"
          }`}
        >
          Me Gusta 🖤
        </button>
      </div>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Error") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CatFactCard;
