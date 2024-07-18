import React from "react";
import "./Home.css";
import PastaImage from "../images/Pasta.png";

function Home() {
  return (
    <div>
      <div className="landingPage">
        <div className="intro">
          <div className="description-image">
            <img src={PastaImage} alt="App Description" className="description-image" />
          </div>
          <div className="text-container">
            <h1>DON'T KNOW WHAT </h1>
            <h1>
              TO <span className="highlighted">COOK?</span>
            </h1>
            <p className="ptag">
              Whether you're a seasoned chef or a kitchen novice, RecipeAPP is
              here to inspire your next culinary masterpiece. Explore a vast
              collection of mouthwatering recipes, carefully curated and tested to
              ensure simplicity without compromising on flavor. Say goodbye to
              mealtime dilemmas, and let RecipeAPP transform your kitchen
              experience.
            </p>
          </div>
        </div>
        <div className="separator"></div>
        <div className="homeImage">
        </div>
      </div>
    </div>
  );
}

export default Home;

