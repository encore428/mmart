import * as React from "react"
import { useHistory } from "react-router-dom"

import { BASE_URL, STORAGE_MY_SPEC } from "./const";

export const SpecForm = () => {
  const history = useHistory();
  
  const getDepts = () => {
    return fetch(`${BASE_URL}departments`).then((res) => res.json());
  }

  React.useEffect(() => {
      getDepts().then((res) => {setDepts(res.departments);});
  }, []);

  const [depts, setDepts] = React.useState([]);

  const [department, setDepartment] = React.useState(0);
  const [highlight, setHighlight] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [artist, setArtist] = React.useState(false);

  const queryAPI = () => {
    let result = "";
    if (department!==0) {
        result = result + "departmentIds=" + department + "&";
    }
    console.log(highlight);
    if (highlight) {
      result = result + "isHighlight=true&";
    }
    if (artist && keyword!=="") {
      result = result + "artistOrCulture=true&";
    }
    if (keyword!=="") {
      result = result + "q=" + keyword + "&";
    }
    if (result !== "") {result = result.slice(0,-1);}
    return "hasImages=true&"+result;
  }


  return (
      <div>
        <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100">
          <form id="spec-form" className="flex flex-col h-full" 
                    onSubmit={
                        (ev) => {
                          ev.preventDefault(); let myStr=queryAPI(); 
                          localStorage.setItem(STORAGE_MY_SPEC, myStr);
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
                <select id="department" className="inline-flex items-center" value={department} onChange={(ev) => {setDepartment(Number(ev.target.value))}} >
                  <option value={0}>All</option>
                  {depts.map((dept) =>
                    <option value={dept.departmentId}>{dept.displayName}</option>
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
                    value={highlight} onChange={(ev) => {setHighlight(!highlight)}}/>
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
                  value={keyword}
                  onChange={(ev) => {setKeyword(ev.target.value)}} />
              </div>
            </div>

            <div className="px-1 sm:px-6 pb-2">
              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-900">
                  Find keyword in artist/culture
                </label>
                <input type="checkbox" id="artist" className="form-checkbox" 
                    value={artist} onChange={(ev) => {setArtist(!artist)}}/>
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