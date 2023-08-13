import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import CurrencyConverter from "./components/CurrencyConverter";

// import StarRating from "./components/StarRating";
// import TestExpander from "./components/TestExpander";

// function Test() {
//   //   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       {/* <StarRating
//         className="test"
//         maxRating={10}
//         defaultRating={3}
//         onSetRating={setMovieRating}
//       />
//        */}

//       <TestExpander
//         CollapseNumWords={30}
//         expandButtonText="Show text"
//         collapseButtonText="Collapse text"
//         buttonColor="#ff6622">
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
//         quas, molestiae minima a at ipsum officia est deserunt magnam recusandae
//         quidem architecto delectus soluta praesentium autem impedit illum vel
//         cum ut molestias harum optio! Itaque deserunt dolores praesentium quod
//         animi dolore alias. Accusantium nostrum dolorum eveniet rerum quas,
//         error, placeat vel officia reprehenderit officiis assumenda optio id!
//         Obcaecati, quibusdam officia!
//       </TestExpander>

//       {/* <p>This movie was rated {movieRating} stars</p>
//        */}
//     </div>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App></App>);
