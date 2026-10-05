import React, { useState, useEffect, useRef, useMemo } from "react";
import { moviesData } from "./datas/movies";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

function MainApp() {
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("movie_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const searchInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("movie_favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleToggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMovies = useMemo(() => {
    let result = [...moviesData];

    if (searchQuery.trim() !== "") {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedGenre !== "All Genres") {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    return result;
  }, [searchQuery, selectedGenre]);

  const appStyle = {
    backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
    color: theme === "light" ? "#000000" : "#ffffff",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={appStyle}>
      <Header />

      <SearchBar
        searchInputRef={searchInputRef}
        onSearchChange={handleSearchChange}
      />
      <GenreFilter
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <p>
        <strong>Total Movies:</strong> {filteredMovies.length}
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 2 }}>
          <MovieList
            movies={filteredMovies}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={setSelectedMovie}
          />
        </div>
        <div style={{ flex: 1 }}>
          <MovieDetail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
