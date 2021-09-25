import { useEffect, useState } from "react"
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from "react-router-dom";
import { AppShell } from "./app-shell";
import './index.css';
import BrowPage from './Brow-page';
import SpecForm from './Spec-form';
import HomePage from './Home-page';
import ObjtPage from './Objt-page';

import * as Const from "./const";


const usePersistedState = (storageKey, defaultValue, suggestedValue) => {
  const [value, setValue] = useState(
    () => {
      const myStr = localStorage.getItem(storageKey);
      console.log(`**** localstorage ${storageKey} initial load [${myStr}]`);
      console.log(`localStorage.setItem("${storageKey}", "${suggestedValue||"your value"}") to set`);
      console.log(`localStorage.removeItem("${storageKey}") to reset`);
      if (typeof defaultValue === "string") {return myStr===null?defaultValue:myStr;}
      if (typeof defaultValue === "number") {return Number(myStr)===null?defaultValue:Number(myStr);}
      if (typeof defaultValue === "boolean") {return myStr===null?defaultValue:myStr==="1";}
      if (typeof defaultValue === "object" && Array.isArray(defaultValue)) {return myStr===null||myStr===""?[]:myStr.split(',').map(function(e){return Number(e)});}
    }
  );

  useEffect(() => {
    let myStr = value;
    if (typeof value === "number") {myStr = String(value);}
    if (typeof value === "boolean") {myStr = value?"1":"0";}
    if (typeof value === "object" && Array.isArray(value)) {myStr = value.join(',');}
    localStorage.setItem(storageKey, myStr);
    console.log(`**** localstorage ${storageKey} updated to ${value}`)
  }, [value, storageKey]);

  return [value, setValue];
};



export const Index = () => {

  const [storedMySpecStr, setStoredMySpecStr] = usePersistedState(Const.STORAGE_MY_SPEC, "");
  const [storedMyDescStr, setStoredMyDescStr] = usePersistedState(Const.STORAGE_MY_DESC, "");


  ////////////////////////////////////
  // states for my collections page
  const [myColl, setMyColl] = usePersistedState(Const.STORAGE_MY_COLL, [], "186318,335370,437184,830094,761604,437329,436121,436535");
  
  const [clPageNum, setClPageNum] = useState(1);
  const [clPageCnt, setClPageCnt] = useState(1);

  useEffect(() => {
    setClPageNum(Math.min(clPageNum,clPageCnt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clPageCnt]);

  useEffect(() => {
    setClPageCnt(Math.max(1,Math.floor((myColl.length+Const.PAGESIZE-1) / Const.PAGESIZE)));
  }, [myColl]);


  ////////////////////////////////////
  // states for Specifications page
  const [storedDept, setStoredDept] = usePersistedState(Const.STORAGE_MY_DEPT, 0, "0");
  const [storedKeyw, setStoredKeyw] = usePersistedState(Const.STORAGE_MY_KEYW, "");
  const [storedHlgt, setStoredHlgt] = usePersistedState(Const.STORAGE_MY_HLGT, false, "1");
  const [storedAtst, setStoredAtst] = usePersistedState(Const.STORAGE_MY_ATST, false, "1");


  ////////////////////////////////////
  // states for my browsing page
  const getObjects = (spec) => {
    return fetch(`${Const.BASE_URL}search?${spec}`).then((res) => res.json()).catch((e) => e);
  }

  //const [isLoading, setIsLoading] = useState(false);
  const [brPageNum, setBrPageNum] = useState(1);
  const [brPageCnt, setBrPageCnt] = useState(1);
  const [myBrows, setMyBrows] = useState([]);

  useEffect(() => {
    //setIsLoading(true);
    setBrPageNum(Math.min(brPageNum,brPageCnt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brPageCnt]);

  useEffect(() => {
    //setIsLoading(true);
    setBrPageCnt(Math.max(1,Math.floor((myBrows.length+Const.PAGESIZE-1) / Const.PAGESIZE)));
    //setIsLoading(false);
  }, [myBrows]);

  useEffect(() => {
    // setIsLoading(true);
    getObjects(storedMySpecStr)
      .then((res) => {  if (res.objectIDs===undefined || res.objectIDs===null) {
                            setMyBrows([]);
                        } else {
                            setMyBrows(res.objectIDs);
                        }
                        setBrPageNum(1);
                      });
  }, [storedMySpecStr]);


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
          <ObjtPage />
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
