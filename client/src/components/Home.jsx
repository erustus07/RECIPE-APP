import React from "react";
import './Home.css';


function Home() {
  return (
    <div>
      <div className="landingPage">
        <div className="intro">
          <div className="text-container">
            <h1>DON'T KNOW WHAT </h1>
            <h1 >
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
          <img src="/homepage.png" alt="Homepage" />
        </div>
      </div>
    </div>
  );
}

export default Home;
