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
         <p><b>Title:</b> {data.title}</p>
         {data.artistDisplayName!==""||data.artistDisplayBio!==""? (
           <p><b>Artist:</b> {data.artistDisplayName}{data.artistDisplayName!==""&&data.artistDisplayBio!==""?",":""} {data.artistDisplayBio}</p>
         ):""}
         <p><b>Medium</b> {data.medium}</p>
         <p><b>Object Date:</b> {data.objectDate}</p>
         <p><b>Credit Line:</b> {data.creditLine}</p>
         </>
         : '<p>Unable to load artwork data</p>'
      }

    </>
  );
 
}
 
export default ObjtPage;