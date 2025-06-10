import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import CatFactCard from "./components/CatFactCard";
import LikedFactsList from "./components/LikedFactsList";
import PopularFactsList from "./components/PopularFactsList";
import "./index.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshLists, setRefreshLists] = useState(0); // Estado para forzar la actualización de las listas

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("currentUser"); // Limpiar si está corrupto
      }
    }
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user)); // Guarda el usuario en localStorage
    setRefreshLists((prev) => prev + 1); // Forzar actualización de listas
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setRefreshLists((prev) => prev + 1); // Forzar actualización de listas
  };

  const handleFactLiked = () => {
    setRefreshLists((prev) => prev + 1); // Incrementa el estado para forzar la actualización de las listas
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center space-y-8">
      <header className="w-full max-w-4xl bg-blue-600 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">SSCatFacts</h1>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">¡Hola, {currentUser.username}!</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center space-y-8">
          {!currentUser ? (
            <AuthForm onAuthSuccess={handleAuthSuccess} />
          ) : (
            <CatFactCard
              userId={currentUser.id}
              onFactLiked={handleFactLiked}
            />
          )}
        </div>

        <div className="flex flex-col items-center space-y-8">
          <LikedFactsList
            userId={currentUser?.id}
            triggerRefresh={refreshLists}
          />
          <PopularFactsList triggerRefresh={refreshLists} />
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center text-gray-600 mt-8">
        <p>&copy; 2025 SSCatFacts. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
