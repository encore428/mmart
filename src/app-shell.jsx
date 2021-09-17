import { Link } from 'react-router-dom'
//import { Button } from "components/button";

export const AppShell = ({ children }) => {
//  const { status, userName } = useAuth(); 

  return (
    <>
      <div>
        <h1>My Metropolitan Museum of Art Collection</h1>
          <ul className="header">
            <li><Link to="/">My collection</Link></li>
            <li><Link to="/spec">Specifications</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>
          <div className="content">
            {children}
          </div>
        </div>
    </>
  );
};
