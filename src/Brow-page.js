import { useContext, useEffect, useState } from "react"

import { PAGESIZE } from "./const";
import { Button } from "./components/button";
import { NumberControl } from "./components/number-control";
import { CollItem } from "./components/coll-item"
import NavContext from './navContext';

export const BrowPage = ( {storedMyDescStr, myBrows, pageCnt , 
                           myColl, setMyColl, 
                           pageNum, setPageNum, 
                           isLoading, setIsLoading } ) => {

  const { navCurr, setNavCurr } = useContext(NavContext);

  const [goPage, setGoPage] = useState(pageNum);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`switched to ${navCurr}`);
  }, [navCurr]);

  useEffect(() => {
    setNavCurr("/browse");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGoPage(pageNum);
  }, [pageNum]);

  const pageMvnt = (pmvt, num) => {
      if (pmvt==='R') {
        // The formula ensures random movement to any one of the other pages except itself.
        setPageNum(((pageNum + Math.floor(Math.random()*(pageCnt-1)))% pageCnt)+1);
      } else if (pmvt==='G') {
        setPageNum(num);
      } else {
        setPageNum(pageNum + num);
      }
  }

  const pickObj = (objid) => {
      setIsLoading(true);
      setMyColl(myColl.concat(Number(objid)));
      setIsLoading(false);
  }

  const deleObj = (objid) => {
      setIsLoading(true);
      setMyColl(myColl.filter(obj => obj!==Number(objid)));
      setIsLoading(false);
}

  return (
    <div>
        <div id="pagination-btns" className="flex justify-between items-center">
            <Button
                type="button"
                variant="primary"
                    disabled={isLoading || pageNum<=1} 
                    onClick={() => {pageMvnt('P', -1);}}
              >
                {isLoading?"Loading...":"Previous"}
            </Button>

            <form id="goform" className="flex justify-between items-center">
                <NumberControl value={goPage} setValue={setGoPage} 
                               error={error} setError={setError}
                               maxNum={pageCnt} 
                />
                <Button
                    type="button"
                    variant="primary"
                    disabled={isLoading} 
                    onClick={() => {setError("");pageMvnt('G', Number(goPage));}}
                >
                      {isLoading?'Loading...':(`Go to page ${goPage}`)}
                </Button>
            </form>            
            <Button
                type="button"
                variant="outline"
                disabled={isLoading} 
                onClick={() => {pageMvnt('P', 0);}}
              >
                {isLoading?'Loading...':(`Page ${pageNum} of ${pageCnt}`)}
            </Button>
            <Button
                type="button"
                variant="primary"
                disabled={isLoading || pageCnt===1} 
                onClick={() => {pageMvnt('R');}}
              >
                {isLoading?"Loading...":"Random"}
            </Button>
            <Button
                type="button"
                variant="primary"
                disabled={isLoading || pageNum>=pageCnt} 
                onClick={() => {pageMvnt('P', 1);}}
              >
                {isLoading?"Loading...":"Next"}
            </Button>
        </div>

        <div className="max-w-xm flex py-6 space-y-1">
          {myBrows && (myBrows.slice((pageNum-1) * PAGESIZE, (pageNum) * PAGESIZE).length > 0) && myBrows.slice((pageNum-1) * PAGESIZE, (pageNum) * PAGESIZE).map((object => (
              (myColl.indexOf(Number(object))<0)?(
                <CollItem
                  objId={object}
                  key={object}
                  goPick={() => pickObj(object)}
                />
              ):(
                <CollItem
                  objId={object}
                  key={object}
                  goDele={() => deleObj(object)}
                />
              )
            ))
          )}
        </div>
        <h2>The specification [{storedMyDescStr}] turns out {!myBrows || myBrows.length===0?'empty':(`${myBrows.length} item`)}{myBrows.length>1?'s':''}</h2>
    </div>
  );
};

 
export default BrowPage;