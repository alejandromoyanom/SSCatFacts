import React, { useState } from "react";
import { getExternalCatFact, likeCatFact } from "../api";

function CatFactCard({ userId, onFactLiked }) {
  const [currentFact, setCurrentFact] = useState(null);
  const [message, setMessage] = useState("");

  const fetchNewFact = async () => {
    setMessage("");
    try {
      const data = await getExternalCatFact();
      setCurrentFact(data.fact); // La API devuelve { fact: "...", length: ... }
    } catch (error) {
      setMessage("Error al obtener el hecho del gato.");
      console.error(error);
    }
  };

  const handleLikeFact = async () => {
    setMessage("");
    if (!userId) {
      setMessage('Debes iniciar sesión para marcar un hecho como "me gusta".');
      return;
    }
    if (!currentFact) {
      setMessage('Primero obtén un hecho para poder "likearlo".');
      return;
    }

    try {
      // Usamos el texto del hecho como factId para la base de datos
      const data = await likeCatFact(userId, currentFact);
      setMessage(data.message);
      onFactLiked(); // Notifica al componente padre para que actualice las listas
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
        Hecho de Gato
      </h2>
      {currentFact ? (
        <p className="text-gray-700 text-lg mb-4 text-center">{currentFact}</p>
      ) : (
        <p className="text-gray-500 text-center">
          Haz click en "Obtener Hecho" para ver uno.
        </p>
      )}

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={fetchNewFact}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Obtener Hecho
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
          Me Gusta ❤️
        </button>
      </div>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CatFactCard;
