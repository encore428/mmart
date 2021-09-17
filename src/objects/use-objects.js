import * as React from "react";
import { getObjectDetails } from "./objects.service";

export const useObjectDetails = (objectId) => {
  const [data, setData] = React.useState(undefined);
  console.log(`in useObjectDetails with objectId=${objectId}`);
  React.useEffect(() => {
    const ab = new AbortController();
    getObjectDetails(objectId, ab.signal).then(setData);

    return () => {
      ab.abort();
    };
  }, [objectId]);

  return {
    data,
  };
};
