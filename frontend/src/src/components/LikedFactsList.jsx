// SSCatFacts/frontend/src/components/LikedFactsList.jsx

import React, { useEffect, useState } from "react";
import { getLikedCatFacts } from "../api";

function LikedFactsList({ userId, triggerRefresh }) {
  const [likedFacts, setLikedFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLikedFacts = async () => {
    if (!userId) {
      setLikedFacts([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await getLikedCatFacts(userId);
      if (Array.isArray(data)) {
        setLikedFacts(data);
      } else {
        console.error(
          "LikedFactsList: API did not return an array for liked facts. Received:",
          data
        );
        setLikedFacts([]);
      }
    } catch (err) {
      setError("Error al cargar hechos favoritos.");
      console.error("Error fetching liked facts:", err);
      setLikedFacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedFacts();
  }, [userId, triggerRefresh]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col h-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Tus Hechos Favoritos
      </h2>
      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && likedFacts.length === 0 && !error && userId && (
        <p className="text-center text-gray-500">
          Aún no has marcado ningún hecho como favorito.
        </p>
      )}
      {!userId && (
        <p className="text-center text-gray-500">
          Inicia sesión para ver tus hechos favoritos.
        </p>
      )}

      <ul className="space-y-2 overflow-y-auto pr-2 flex-grow">
        {likedFacts.map((fact) => (
          <li
            key={fact.id}
            className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-700"
          >
            {fact.factText}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikedFactsList;
