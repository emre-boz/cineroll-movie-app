import { useNavigate } from 'react-router-dom';

function useNavigation() {
  let navigate = useNavigate();

  function goToMovie(movieId) {
    navigate(`/movie/id/${movieId}`);
  }

  function goToPerson(personId) {
    navigate(`/person/id/${personId}`);
  }

  function goToSearch(query) {
    navigate(`/search/query/${query}`);
  }
  return { goToMovie, goToPerson,goToSearch };
}

export default useNavigation;
