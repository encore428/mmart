import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from "react-router-dom";
import { AppShell } from "./app-shell";
import './index.css';
import BrowPage from './Brow-page';
import SpecForm from './Spec-form';
import HomePage from './Home-page';
import ObjectPage from './Object-page';

import * as Const from "./const";

export const Index = () => {

  const [storedMySpecStr, setStoredMySpecStr] = React.useState((localStorage.getItem(Const.STORAGE_MY_SPEC)===null)?"":localStorage.getItem(Const.STORAGE_MY_SPEC));
  const [storedMyDescStr, setStoredMyDescStr] = React.useState((localStorage.getItem(Const.STORAGE_MY_DESC)===null)?"":localStorage.getItem(Const.STORAGE_MY_DESC));
  //localStorage.removeItem(STORAGE_MY_COLL);
  //const storedMyCollStr = (localStorage.getItem(STORAGE_MY_COLL)===null)?"186318,335370,437184,830094,761604,437329,436121,436535":localStorage.getItem(STORAGE_MY_COLL);
  const storedMyCollStr = (localStorage.getItem(Const.STORAGE_MY_COLL)===null)?"":localStorage.getItem(Const.STORAGE_MY_COLL);
  //console.log(`storedMySpecStr loaded [${storedMySpecStr}]`);
  //console.log(`storedMyDescStr loaded [${storedMyDescStr}]`);
  //console.log(`storedMyCollStr loaded [${storedMyCollStr}]`);

  ////////////////////////////////////
  // states for my collections page
  const [myColl, setMyColl] = React.useState(storedMyCollStr===""?[]:storedMyCollStr.split(',').map(function(e){return Number(e)}));
  
  const [clPageNum, setClPageNum] = React.useState(1);
  const [clPageCnt, setClPageCnt] = React.useState(1);

  React.useEffect(() => {
    setClPageNum(Math.min(clPageNum,clPageCnt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clPageCnt]);

  React.useEffect(() => {
    setClPageCnt(Math.max(1,Math.floor((myColl.length+Const.PAGESIZE-1) / Const.PAGESIZE)));
    localStorage.setItem(Const.STORAGE_MY_COLL, myColl.join(','));
    console.log(`saving coll string ${myColl.join(',')}`)
  }, [myColl]);


  ////////////////////////////////////
  // states for Specifications page
  const [storedDept, setStoredDept] = React.useState((localStorage.getItem(Const.STORAGE_MY_DEPT)===null)?0:Number(localStorage.getItem(Const.STORAGE_MY_DEPT)));
  const [storedKeyw, setStoredKeyw] = React.useState((localStorage.getItem(Const.STORAGE_MY_KEYW)===null)?"":localStorage.getItem(Const.STORAGE_MY_KEYW));
  const [storedHlgt, setStoredHlgt] = React.useState((localStorage.getItem(Const.STORAGE_MY_HLGT)===null)?false:localStorage.getItem(Const.STORAGE_MY_HLGT)==="1");
  const [storedAtst, setStoredAtst] = React.useState((localStorage.getItem(Const.STORAGE_MY_ATST)===null)?false:localStorage.getItem(Const.STORAGE_MY_ATST)==="1");
  
  React.useEffect(() => {
    localStorage.setItem(Const.STORAGE_MY_DEPT, storedDept);
  }, [storedDept]);

  React.useEffect(() => {
    localStorage.setItem(Const.STORAGE_MY_KEYW, storedKeyw);
  }, [storedKeyw]);

  React.useEffect(() => {
    localStorage.setItem(Const.STORAGE_MY_HLGT, storedHlgt?"1":"0");
  }, [storedHlgt]);

  React.useEffect(() => {
    localStorage.setItem(Const.STORAGE_MY_ATST, storedAtst?"1":"0");
  }, [storedAtst]);


  ////////////////////////////////////
  // states for my browsing page
  const getObjects = (spec) => {
    return fetch(`${Const.BASE_URL}search?${spec}`).then((res) => res.json()).catch((e) => e);
  }

  //const [isLoading, setIsLoading] = React.useState(false);
  const [brPageNum, setBrPageNum] = React.useState(1);
  const [brPageCnt, setBrPageCnt] = React.useState(1);
  const [myBrows, setMyBrows] = React.useState([]);

  React.useEffect(() => {
    //setIsLoading(true);
    setBrPageNum(Math.min(brPageNum,brPageCnt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brPageCnt]);

  React.useEffect(() => {
    //setIsLoading(true);
    setBrPageCnt(Math.max(1,Math.floor((myBrows.length+Const.PAGESIZE-1) / Const.PAGESIZE)));
    //setIsLoading(false);
  }, [myBrows]);

  React.useEffect(() => {
    // setIsLoading(true);
    getObjects(storedMySpecStr)
      .then((res) => {  if (res.objectIDs===undefined) {
                            setMyBrows([]);
                        } else {
                            setMyBrows(res.objectIDs);
                        }
                        setBrPageNum(1);
                      });
    localStorage.setItem(Const.STORAGE_MY_SPEC, storedMySpecStr);
    localStorage.setItem(Const.STORAGE_MY_DESC, storedMyDescStr);
  }, [storedMySpecStr, storedMyDescStr]);


  return (
    <BrowserRouter>
      <AppShell>
        <Route path="/browse">
          <BrowPage storedMyDescStr={storedMyDescStr} myBrows={myBrows} pageCnt={brPageCnt} 
                    myColl={myColl} setMyColl={setMyColl} 
                    pageNum={brPageNum} setPageNum={setBrPageNum}
          />
        </Route>
        <Route path="/spec">
          <SpecForm setStoredMySpecStr={setStoredMySpecStr} setStoredMyDescStr={setStoredMyDescStr} 
                    storedDept={storedDept} setStoredDept={setStoredDept} 
                    storedKeyw={storedKeyw} setStoredKeyw={setStoredKeyw}
                    storedHlgt={storedHlgt} setStoredHlgt={setStoredHlgt}
                    storedAtst={storedAtst} setStoredAtst={setStoredAtst}
          />
        </Route>
        <Route path="/art/:objectId">
          <ObjectPage />
        </Route>
        <Route exact path="/">
          <HomePage myColl={myColl} setMyColl={setMyColl} 
                    pageNum={clPageNum} setPageNum={setClPageNum}
                    pageCnt={clPageCnt} setPageCnt={setClPageCnt}
          />
        </Route>
      </AppShell>
    </BrowserRouter>
  );

};

ReactDOM.render(<Index />, document.getElementById('root'));
