import React from 'react';

import {STORAGE_MY_COLL, PAGESIZE } from "./const"
import { CollItem } from "./components/coll-item"

export const HomePage = () => {

  //localStorage.removeItem(STORAGE_MY_COLL);
  const storedMyCollStr = (localStorage.getItem(STORAGE_MY_COLL)===null)?"186318,437184,830094,761604,437329,436121,436535":localStorage.getItem(STORAGE_MY_COLL);
  //const storedMyCollStr = (localStorage.getItem(STORAGE_MY_COLL)===null)?"":localStorage.getItem(STORAGE_MY_COLL);
  console.log(`storedMyCollStr=${storedMyCollStr}`);

  const [myColl, setMyColl] = React.useState(storedMyCollStr===""?[]:storedMyCollStr.split(',').map(function(e){return Number(e)}));
  
  // localStorage.setItem(STORAGE_MY_COLL, myColl.join(','));

  const [pageColl, setPageColl] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageCnt, setPageCnt] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const pageMvnt = (pmvt) => {
      setPageColl(myColl.slice((pageNum+pmvt-1) * PAGESIZE, (pageNum+pmvt) * PAGESIZE));
      setPageNum(pageNum + pmvt);
  }

  React.useEffect(() => {
    setPageColl(myColl.slice((pageNum-1) * PAGESIZE, (pageNum) * PAGESIZE));
    setIsLoading(false);
  }, [myColl, pageNum]);

  React.useEffect(() => {
    setPageNum(Math.min(pageNum,pageCnt));
  }, [pageCnt]);

  React.useEffect(() => {
    setPageCnt(Math.max(1,Math.floor((myColl.length+PAGESIZE-1) / PAGESIZE)));
    localStorage.setItem(STORAGE_MY_COLL, myColl.join(','));
  }, [myColl]);

  const deleObj = (objid) => {
      setIsLoading(true);
      if (window.confirm(`Proceed to delete from collection object ${objid}?`)) {
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
                onClick={() => {pageMvnt(-1);}}
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
            <button id="page-num" type="button"
                disabled={isLoading} 
                onClick={() => {pageMvnt(0);}}
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
                {isLoading?'Loading...':(!pageColl?'LOAD':`Page ${pageNum} of ${pageCnt}`)}
            </button>
            <button id="next-btn" type="button" 
                disabled={isLoading || pageNum>=pageCnt} 
                onClick={() => {pageMvnt(1);}}
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
          {(pageColl.length > 0) && pageColl.map((object => (
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