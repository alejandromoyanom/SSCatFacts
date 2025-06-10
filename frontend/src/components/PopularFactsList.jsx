import React, { useEffect, useState } from "react";
import { getPopularCatFacts } from "../services/api";

function PopularFactsList({ triggerRefresh }) {
  const [popularFacts, setPopularFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPopularFacts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPopularCatFacts();
      setPopularFacts(data);
    } catch (err) {
      setError("Error al cargar Facts populares.");
      console.error("Error fetching popular facts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularFacts();
  }, [triggerRefresh]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col h-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Facts Populares de la Comunidad
      </h2>
      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && popularFacts.length === 0 && !error && (
        <p className="text-center text-gray-500">No hay Facts populares aún.</p>
      )}

      <ul className="space-y-2 overflow-y-auto pr-2 flex-grow">
        {popularFacts.map((fact, index) => (
          <li
            key={index}
            className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-700"
          >
            <span className="font-semibold text-purple-700">
              ({fact.likeCount} likes)
            </span>{" "}
            {fact.factText}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularFactsList;
