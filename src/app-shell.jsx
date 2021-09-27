import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import NavContext from './navContext';

//import { useAuth, LogoutButton } from "./nav";
//import { Button } from "components/button";

export const AppShell = ({ children }) => {

  // https://dmitripavlutin.com/react-context-and-usecontext/ 
  // I referenced the above to use Context.
  const [navCurr, setNavCurr] = useState(''); 
  const value = useMemo(
    () => ({ navCurr, setNavCurr }),
    [navCurr]
  );

  return (
    <NavContext.Provider value = {value}>
      <div>
        <h1>My Metropolitan Museum of Art Collection navCurr is {navCurr}</h1>
          <ul className="header">
            <li><Link to="/" className={navCurr==="/"?"active":""} >My collection</Link></li>
            <li><Link to="/spec" className={navCurr==="/spec"?"active":""} >Specifications</Link></li>
            <li><Link to="/browse" className={navCurr==="/browse"?"active":""} >Browse</Link></li>
          </ul>
          <div className="content">
            {children}
          </div>
        </div>
    </NavContext.Provider>
  );
};
