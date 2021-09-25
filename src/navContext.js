import { createContext } from 'react';

const NavContext = createContext({
    navCurr: '',
    setNavCurr: () => {}
});

export default NavContext;