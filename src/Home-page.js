import { useContext, useEffect, useState } from "react"

import { PAGESIZE } from "./const"
import { CollItem } from "./components/coll-item"
import NavContext from './navContext';

export const HomePage = ({myColl, setMyColl, pageNum, setPageNum, pageCnt, setPageCnt}) => {

  const { navCurr, setNavCurr } = useContext(NavContext);

  const [isLoading, setIsLoading] = useState(false);
  const [goPage, setGoPage] = useState(pageNum);

  useEffect(() => {
    console.log(`switched to ${navCurr}`);
  }, [navCurr]);

  useEffect(() => {
    setNavCurr("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setGoPage(pageNum);
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
            <button id="prev-btn" type="button"
                disabled={isLoading || pageNum<=1} 
                onClick={() => {pageMvnt('P', -1);}}
                    className={`
                    inline-flex justify-center
                    px-4 py-2
                    border border-transparent
                    shadow-sm rounded-md
                    text-xs text-white
                    bg-pink-600
                    hover:bg-pink-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                    `}>
                {isLoading?"Loading...":"Previous"}
            </button>
            <form id="goform" className="flex justify-between items-center">
                <label htmlFor="gopage">Page#</label>
                <input type="number" id="gopage" required 
                    className="
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        focus:ring-pink-500 focus:border-pink-500
                        border-gray-300
                        rounded-md
                    "
                  value={goPage}
                  onChange={(ev) => {setGoPage(Number(ev.target.value)<1?1:(Number(ev.target.value)>pageCnt?pageCnt:Number(ev.target.value)));}} />
                <button id="btngopage" type="button" disabled={isLoading}
                    onClick={() => {pageMvnt('G', Number(goPage));}}
                    className="
                        inline-flex justify-center
                        px-4 py-2
                        border border-transparent
                        shadow-sm rounded-md
                        text-xs text-white
                        bg-pink-600
                        hover:bg-pink-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                        ">
                    Go
                </button>
            </form>            
            <button id="page-num" type="button"
                disabled={isLoading} 
                onClick={() => {pageMvnt('P', 0);}}
                className="
                inline-flex justify-center
                    px-4 py-2
                    border border-transparent
                    shadow-sm rounded-md
                    text-xs text-white
                    bg-pink-600
                    hover:bg-pink-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                    ">
                {isLoading?'Loading...':(`Page ${pageNum} of ${pageCnt}`)}
            </button>
            <button id="next-btn" type="button" 
                disabled={isLoading || pageNum>=pageCnt} 
                onClick={() => {pageMvnt('P', 1);}}
                className="
                inline-flex justify-center
                    px-4 py-2
                    border border-transparent
                    shadow-sm rounded-md
                    text-xs font-medium text-white
                    bg-pink-600
                    hover:bg-pink-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                    ">
                {isLoading?"Loading...":"Next"}
            </button>
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