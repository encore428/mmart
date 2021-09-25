import { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { BASE_URL } from "./const";
import NavContext from './navContext';

export const ObjtPage = () => {
  const params = useParams();
  const objectId = params.objectId;

  const { navCurr, setNavCurr } = useContext(NavContext);
 
  const [data, setData] = useState(null);

  const getObject = (objid) => {
      return fetch(`${BASE_URL}objects/${objid}`).then((res) => res.json());
  }

  useEffect(() => {
      getObject(objectId).then((res) => setData(res));
  }, [objectId]);
  
  setNavCurr("/art");

  return (
    <> Displaying {objectId}
      {data ? 
      <>
         <img src={data.primaryImage} alt="primary" />
         <p>Title: {data.title}</p>
         <p>Artist: {data.artistDisplayName}, {data.artistDisplayBio}</p>
         </>
         : ''
      }

    </>
  );
 
}
 
export default ObjtPage;