// import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import Homepage from './components/HomePage';
// // import Login from './Login';


// function App() {
//   return (
//     <div>
//   <Homepage/>
//     </div>
//   );
// }
// export default App;
import Login from "./login";

function App() {
  const handlelogin = (usrname) => {
    console.log(`user logged in: ${usrname}`);
  };

   return (
    
    <div>
     
      <Login  onLogin={handlelogin} />
    </div>
  );
}


export default App