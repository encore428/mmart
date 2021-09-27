import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import { BASE_URL } from "./const";
import NavContext from './navContext';

export const ObjtPage = () => {
  const params = useParams();
  const objectId = params.objectId;

  const { navCurr, setNavCurr } = useContext(NavContext);
 
  const [data, setData] = useState(null);

  const getObject = (objid) =>
      fetch(`${BASE_URL}objects/${objid}`).then((res) => res.json());

  useEffect(() => {
    console.log(`switched to ${navCurr}`);
  }, [navCurr]);

  useEffect(() => {
    setNavCurr("/art");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      getObject(objectId).then((res) => setData(res)).catch(() => setData(null));
  }, [objectId]);
  
  return (
    <><p>Object Id: {objectId}</p>
      {data ? 
      <>
         <img src={data.primaryImage} alt="primary" />
         <p>Title: {data.title}</p>
         <p>Artist: {data.artistDisplayName}, {data.artistDisplayBio}</p>
         </>
         : '<p>Unable to load artwork data</p>'
      }

    </>
  );
 
}
 
export default ObjtPage;