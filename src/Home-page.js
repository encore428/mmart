import { useContext, useEffect, useState } from "react"

import { PAGESIZE } from "./const"
import { Button } from "./components/button";
import { NumberControl } from "./components/number-control";
import { CollItem } from "./components/coll-item"
import NavContext from './navContext';

export const HomePage = ({myColl, setMyColl, pageNum, setPageNum, pageCnt, setPageCnt}) => {

  const { navCurr, setNavCurr } = useContext(NavContext);

  const [isLoading, setIsLoading] = useState(false);
  const [goPage, setGoPage] = useState(pageNum);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`switched to ${navCurr}`);
  }, [navCurr]);

  useEffect(() => {
    setNavCurr("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setGoPage(pageNum);
    setError("");
  }, [pageNum]);

  const pageMvnt = (pmvt, num) => {
      if (pmvt==='G') {
        setPageNum(num);
      } else {
        setPageNum(pageNum + num);
      }
  }

  const deleObj = (objid) => {
      setIsLoading(true);
      if (window.confirm(`Proceed to delete object ${objid} from collection ?`)) {
          setMyColl(myColl.filter(obj => obj!==objid));
        }
      setIsLoading(false);
  }

  return (
    <div>
        <h2>Your collection {myColl.length===0?'is empty':(`has ${myColl.length} item`)}{myColl.length>1?'s':''}</h2>
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
                disabled={isLoading || pageNum>=pageCnt} 
                onClick={() => {pageMvnt('P', 1);}}
              >
                {isLoading?"Loading...":"Next"}
            </Button>
        </div>

        <div className="max-w-xm flex py-6 space-y-1">
          {(myColl.slice((pageNum-1) * PAGESIZE, (pageNum) * PAGESIZE).length > 0) && myColl.slice((pageNum-1) * PAGESIZE, (pageNum) * PAGESIZE).map((object => (
              <CollItem
                objId={object}
                key={object}
                goDele={() => deleObj(object)}
              />
            ))
          )}
        </div>
    </div>
  );
};

 
export default HomePage;