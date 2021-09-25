import * as React from "react";
import { useParams } from "react-router-dom";

import { BASE_URL } from "./const";

export const ObjtPage = () => {
  const params = useParams();
  const objectId = params.objectId;
 
  const [data, setData] = React.useState(null);

  const getObject = (objid) => {
      return fetch(`${BASE_URL}objects/${objid}`).then((res) => res.json());
  }

  React.useEffect(() => {
      getObject(objectId).then((res) => setData(res));
  }, [objectId]);
  
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