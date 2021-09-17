import React from 'react';

import { BASE_URL, STORAGE_MY_COLL, STORAGE_MY_SPEC, PAGESIZE } from "./const";

import { CollItem } from "./components/coll-item"

export const BrowsePage = () => {

  const storedMySpecStr = (localStorage.getItem(STORAGE_MY_SPEC)===null)?"":localStorage.getItem(STORAGE_MY_SPEC);
  const storedMyCollStr = (localStorage.getItem(STORAGE_MY_COLL)===null)?"":localStorage.getItem(STORAGE_MY_COLL);

  const [myColl, setMyColl] = React.useState(storedMyCollStr===""?[]:storedMyCollStr.split(',').map(function(e){return Number(e)}));
  const [myBrows, setMyBrows] = React.useState([]);
  const [objCnt, setObjCnt] = React.useState(0);

  const getObjects = (spec) => {
    return fetch(`${BASE_URL}search?${spec}`).then((res) => res.json());
  }

  React.useEffect(() => {
      getObjects(storedMySpecStr).then((res) => {setObjCnt(res.total);;setMyBrows(res.objectIDs);});
  }, []);

  
  const [pageBrows, setPageBrows] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageCnt, setPageCnt] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const pageMvnt = (pmvt) => {
      setPageBrows(myBrows.slice((pageNum+pmvt-1) * PAGESIZE, (pageNum+pmvt) * PAGESIZE));
      setPageNum(pageNum + pmvt);
  }

  React.useEffect(() => {
    setPageBrows(myBrows.slice((pageNum-1) * PAGESIZE, (pageNum) * PAGESIZE));
    setIsLoading(false);
  }, [myBrows, pageNum]);

  React.useEffect(() => {
    setPageNum(Math.min(pageNum,pageCnt));
  }, [pageCnt]);

  React.useEffect(() => {
    setPageCnt(Math.max(1,Math.floor((myBrows.length+PAGESIZE-1) / PAGESIZE)));
  }, [myBrows]);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_MY_COLL, myColl.join(','));
  }, [myColl]);


  const pickObj = (objid) => {
      setIsLoading(true);
      if (window.confirm(`Proceed to include object ${objid} in your collection?`)) {
          if (myColl.indexOf(Number(objid))>=0) {
            window.confirm(`Object ${objid} is already in your collection?`)
          } else {
            setMyColl(myColl.concat(Number(objid)));
          }
        }
      setIsLoading(false);
  }
  
  return (
    <div>
        <h2>The specification [{storedMySpecStr}] turns out {myBrows.length===0?'empty':(`${myBrows.length} item`)}{myBrows.length>1?'s':''}</h2>
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
                {isLoading?'Loading...':(!pageBrows?'LOAD':`Page ${pageNum} of ${pageCnt}`)}
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
          {(pageBrows.length > 0) && pageBrows.map((object => (
              <CollItem
                objId={object}
                key={object}
                goPick={() => pickObj(object)}
              />
            ))
          )}
        </div>
    </div>
  );
};

 
export default BrowsePage;


