import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  Movie,
  Person,
  Popular,
  Profil,
  Search,
  TopRatedMovies,
  Trending,
  FullCastAndCrew,
  AdvancedSearch,
  Error,
} from "./pages";
import {
  Footer,
  Header,
  LoadingAnimation,
  ScrollToTop,
} from "./components";

function App() {
  return (
    <>

      <BrowserRouter>
        <ScrollToTop />
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animation" element={<LoadingAnimation />} />
            <Route path="/user" element={<Profil />} />
            <Route path="/movie/id/:id" element={<Movie />} />
            <Route
              path="/movie/id/:id/cast-crew"
              element={<FullCastAndCrew />}
            />
            <Route path="/person/id/:id" element={<Person />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/search/query/:query" element={<Search />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/top-rated" element={<TopRatedMovies />} />
            <Route path='*' element={<Error />} />
       
    

        
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
