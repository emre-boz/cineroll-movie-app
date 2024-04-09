import {
  Slider,
  HomePopular,
  HomeTopRated,
  HomeUpcoming
} from "../components";

function Home() {

  return (
    <>
      <Slider />
      <HomeUpcoming />
      <HomePopular />
      <HomeTopRated />
    </>
  );
}
export default Home;
