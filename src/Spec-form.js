import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { BASE_URL } from "./const";
import NavContext from './navContext';

export const SpecForm = ( {setStoredMySpecStr, setStoredMyDescStr, 
                           storedDept, setStoredDept,
                           storedKeyw, setStoredKeyw,
                           storedHlgt, setStoredHlgt,
                           storedAtst, setStoredAtst }) => {

  const { navCurr, setNavCurr } = useContext(NavContext);

  const history = useHistory();
  
  const getDepts = () =>
    fetch(`${BASE_URL}departments`).then((res) => res.json());

  useEffect(() => {
    console.log(`switched to ${navCurr}`);
  }, [navCurr]);


  useEffect(() => {
      setNavCurr("/spec");
      getDepts()
          .then((res) => {
              if (res) {
                setDepts(res.departments);
              } else {
                setDepts([]);
              }
            });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [depts, setDepts] = useState([]);

  const queryAPI = () => {
    let result1 = ""; let result2 = "";
    if (storedDept!==0) {
      if (depts===undefined || depts===null || depts.filter(dept => dept.departmentId===storedDept)[0]===undefined) {
        setStoredDept(0);
      } else {
        result1 = result1 + "departmentIds=" + storedDept + "&";
        result2 = result2 + depts.filter(dept => dept.departmentId===storedDept)[0].displayName + " department, ";
      }
    }
    if (storedHlgt) {
      result1 = result1 + "isHighlight=true&";
      result2 = result2 + "only high-lighted, ";
    }
    if (storedAtst) {
      result1 = result1 + "artistOrCulture=true&";
      result2 = result2 + "artist or Culture with ";
    }
    result1 = result1 + "q=" + storedKeyw;
    result2 = result2 + `keyword '${storedKeyw}'`;
    return ["hasImages=true&"+result1, result2];
  }

  return (
      <div>
        <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100">
          <form id="spec-form" className="flex flex-col h-full" 
                    onSubmit={
                        (ev) => {
                          ev.preventDefault(); let mySpec=""; let myDesc = ""; [mySpec, myDesc] =queryAPI(); 
                          setStoredMySpecStr(mySpec);
                          setStoredMyDescStr(myDesc);
                          history.push('/browse');
                        }
                    }>
            <div className="py-1 px-4 bg-pink-700 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Browsing specifications</h2>
              </div>
              <div className="mt-1">
                <p className="text-sm text-pink-300">Specify the kind of arts you would like to browse:</p>
              </div>
            </div>

            <div className="px-1 mt-3 sm:px-6 pb-2">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-900">
                  Department
                </label>
                {depts && (
                <select id="department" className="inline-flex items-center" value={storedDept} onChange={(ev) => {setStoredDept(Number(ev.target.value))}} >
                  <option value={0}>All</option>
                  {depts.map((dept) =>
                    <option key={dept.departmentId} value={dept.departmentId}>{dept.displayName}</option>
                  )}
                </select>
                )}
              </div>
            </div>

            <div className="px-1 sm:px-6 pb-2">
              <div>
                <label htmlFor="highlight" className="block text-sm font-medium text-gray-900">
                  Only Highlights
                </label>
                <input type="checkbox" id="highlight" className="form-checkbox" 
                    checked={storedHlgt} onChange={(ev) => {setStoredHlgt(!storedHlgt)}}/>
              </div>
            </div>

            <div className="px-1 sm:px-6 pb-2">
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-900">
                  Keyword
                </label>
                <input type="text" id="keyword" required className="
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    focus:ring-pink-500 focus:border-pink-500
                    border-gray-300
                    rounded-md
                  "
                  value={storedKeyw}
                  onChange={(ev) => {setStoredKeyw(ev.target.value.trim());}} />
              </div>
            </div>

            <div className="px-1 sm:px-6 pb-2">
              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-900">
                  Find keyword in artist/culture
                </label>
                <input type="checkbox" id="artist" className="form-checkbox" 
                    checked={storedAtst} onChange={(ev) => {setStoredAtst(!storedAtst)}}/>
              </div>
            </div>

            <div className="
                    flex-shrink-0
                    px-4 
                    flex justify-end
                    border-t border-gray-200
                ">

                <button type="submit" className="
                        ml-4
                        inline-flex justify-center
                        py-1 px-4
                        border border-transparent shadow-sm rounded-md
                        text-sm font-medium text-white
                        bg-pink-600
                        hover:bg-pink-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-pink-500
                    ">
                  Apply
                </button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default SpecForm;