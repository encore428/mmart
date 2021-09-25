## Fundamentals in Frontend Development - END OF MODULE PROJECT (CAPSTONE PROJECT)
## Questions

# index.js:1 Warning: Cannot update a component (`AppShell`) while rendering a different component (`HomePage`).
I was experimenting using useContext to have a state in `app-shell.js` so that I can high-light the active 
navigation item on the nav bar, such as the picture below, where Specification is high-lighted as the current page:
![screenshot](./app.png)

I referenced this article: https://dmitripavlutin.com/react-context-and-usecontext/ to implment useContext.

1. I have `navContext.js` created to supply a value to indicate the current active page;
```js
import { createContext } from 'react';

const NavContext = createContext({
    navCurr: '',
    setNavCurr: () => {}
});

export default NavContext;
```

2. In `app-shell.js`, I pull out `navCurr` so that I know which of the <Link to/> item I should high-light as actve:

```js
...
import NavContext from './navContext';

export const AppShell = ({ children }) => {

  const [navCurr, setNavCurr] = useState(''); 
  const value = useMemo(
    () => ({ navCurr, setNavCurr }),
    [navCurr]
  );

  return (
    <NavContext.Provider value = {value}>
      <div>
        <h1>My Metropolitan Museum of Art Collection navCurr is {navCurr}</h1>
          <ul className="header">
            <li><Link to="/" className={navCurr==="/"?"active":""} >My collection</Link></li>
            <li><Link to="/spec" className={navCurr==="/spec"?"active":""} >Specifications</Link></li>
            <li><Link to="/browse" className={navCurr==="/browse"?"active":""} >Browse</Link></li>
          </ul>
		  ...
      </div>
    </NavContext.Provider>
  );
};
```
3. In each of the pages related to `<Link to/>`:
```js
...
import NavContext from './navContext';
...
export const BrowPage = ( {storedMyDescStr, myBrows, pageCnt , myColl, setMyColl, pageNum, setPageNum } ) => {

  const { navCurr, setNavCurr } = useContext(NavContext);
   ...
  setNavCurr("/browse");

  return (
    <div>
      ...
    </div>
  );
};
 
export default BrowPage;
```

4. The change seems to work, but I have been getting this **Cannot update a component (`AppShell`) while rendering a different component (`HomePage`)** error since then.

- Could this have anything to do with my deployment of useContext?  
- The syntax looks odd and clumpsy to me, especially `<NavContext.Provider value = {value}>`
- How to I add more variables to useContext?
