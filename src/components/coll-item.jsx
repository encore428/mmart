import * as React from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

import { BASE_URL } from "../const";

import { ButtonBin } from "./button-bin";
import { ButtonAdd } from "./button-add";

/**
 * This component represents an item on a page of items.
 * - objId is a string that is the access key to the object.  This is key 
 *   is appended to a URL to fetch further details.
 * - goDele is a function that when present, will cause a bin icon to be displayed, which 
 *   when clicked should remove the item from the user's collection.
 * - goPick is a function that when present, will cause a download icon to be displayed, which 
 *   when clicked should included the item into the user's collection.
 * Usually, only one of goDele or goPick is present.
 */

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
                {/* The following duplicated image rendering is to cater for Styleguidist.
                    It is necessary because I cannot render <Link> in Styleguidist.
                    At the moment, when invoked by the app, only one of the two functions
                    are defined.  When invoked by Styleguidist sample, both functions
                    are defined.  By checking both functions, the portion without <Link>
                    is rendered. */}
                  {(((typeof goDele)==='function') && ((typeof goPick)==='function'))?
                      (data ? 
                          <img src={data.primaryImageSmall} alt="art small" />
                        :
                          `Unable to load details of artwork ${objId}`
                      )
                    :
                      ( <Link to={`/art/${objId}`}>
                        {  data ? 
                            <img src={data.primaryImageSmall} alt="art small" />
                          :
                            `Unable to load details of artwork ${objId}`
                        }
                        </Link>
                      )
                  }

                </div>
              </div>
              <span className="text-xs">
                  {data ? `[${objId}] ${data.title}`:''}
              </span>
            </div>
          </div>
        </div>
        {((typeof goDele)==='function') ?
          <ButtonBin goDele={goDele} />:""
        }
        {((typeof goPick)==='function') ?
          <ButtonAdd goPick={goPick} />:""
        }
    </div>






  );
}
// the use of      data ? data.objectID : ''
// is important here because data starts as null, nd yet
// the rendering began before data is being filled up.
// so the data ? will thus display nothing until the content
// arrives.
CollItem.propTypes = {
  objId: PropTypes.string,
  goDele: PropTypes.func,
  goPick: PropTypes.func
};
