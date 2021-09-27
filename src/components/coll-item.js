import * as React from "react";
import { Link } from 'react-router-dom'

import { BASE_URL } from "../const";

export const CollItem = ({objId, goDele, goPick}) => {

    const [data, setData] = React.useState(null);

    const getObject = (objid) => 
         fetch(`${BASE_URL}objects/${objid}`).then((res) => res.json());

    const loadObject = (objid, signal) => {
        // setIsLoading(true);
        getObject(objid, signal)
            .then((res) => {
                if (res) {
                    setData(res);
                } else {
                    setData(null);
                }
                // setIsLoading(false);
            })
    }

    React.useEffect(() => {
        const ab = new AbortController();
        loadObject(objId, ab.signal);
        return () => {
            ab.abort();
        };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objId]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="mt-2 flex">
              <div className="flex items-center gap-2 text-sm leading-5 text-gray-500">
              <Link to={`/art/${objId}`}>
                {data ? 
                <img src={data.primaryImageSmall} alt="art small" />
                : `Unable to load details of artwork ${objId}`}
                </Link>
              </div>
            </div>
            <span className="text-xs">
                {data ? `[${objId}] ${data.title}`:''}
            </span>
          </div>
        </div>
      </div>
      {((typeof goDele)==='function') ?
      <button className="p-1 rounded-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring focus:ring-pink-500 focus:ring-opacity-30 transition duration-150 ease-in-out"
                    onClick={() => goDele()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
      </button>:""
      }
      {((typeof goPick)==='function') ?
      <button className="p-1 rounded-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring focus:ring-pink-500 focus:ring-opacity-30 transition duration-150 ease-in-out"
                    onClick={() => goPick()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
      </button>:""
      }
    </div>






  );
}
// the use of      data ? data.objectID : ''
// is important here because data starts as null, nd yet
// the rendering began before data is being filled up.
// so the data ? will thus display nothing until the content
// arrives.