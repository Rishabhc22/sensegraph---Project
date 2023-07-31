import { Navbar } from "../navbar/Navbar";
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="box">
      <Navbar />
      <div className="box1">
        <input
          type="text"
          placeholder="Click the buttons above to see the functionality. Hope You have a Good Experience :)"
        />
      </div>
    </div>
  );
};

export default HomePage;
