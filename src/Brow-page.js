import { useContext, useEffect, useState } from "react"

import { PAGESIZE } from "./const";
import { CollItem } from "./components/coll-item"
import NavContext from './navContext';

export const BrowPage = ( {storedMyDescStr, myBrows, pageCnt , myColl, setMyColl, pageNum, setPageNum } ) => {

  const { navCurr, setNavCurr } = useContext(NavContext);

  const [isLoading, setIsLoading] = useState(false);
  const [goPage, setGoPage] = useState(pageNum);

  useEffect(() => {
    console.log('switch to /browse');
    setNavCurr("/browse");
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
            <button id="rand-btn" type="button" 
                disabled={isLoading || pageCnt===1} 
                onClick={() => {pageMvnt('R');}}
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
                {isLoading?"Loading...":"Random"}
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