import { createContext, useContext, useEffect, useState} from "react";
import useMediaQuery from "../hooks/mediaQuery";

const ContextProvider = createContext(null);

export const Provider = ({children}) => {
    const isMobile = useMediaQuery('(max-width: 500px)');
    const [navbarShrink, setNavbarShrink] = useState(isMobile);

    useEffect(() => {
        setNavbarShrink(isMobile);
    }, [isMobile]);

    if(isMobile != null) return <ContextProvider.Provider value={{
        navbarShrink, 
        setNavbarShrink, 
        isMobile
    }}>
        {children}
    </ContextProvider.Provider>;
};

export const useStateContext = () => useContext(ContextProvider);