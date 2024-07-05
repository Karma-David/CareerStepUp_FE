import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Pagess/Home';


// import Students from './Components/Students/Students';
// import Fees from './Components/Fees/Fees';
// import Course from './Components/Course/Course';
function App() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  
  return (
    
      <div  style={{backgroundColor: 'white' , width:'100%'  }}  className='container-fluid bg-secondary min-vh-100'>
        <div  style={{backgroundColor: 'white' , width:'100%'}}   className='row'>
         
          <div style={{width: '100%' }} className={`col ${toggle ? 'col-10' : 'col-12'} vh-100`}>
          <Home Toggle={Toggle} />
            
              
            
          </div>
        </div>
      </div>
    
  );
}

export default App;
