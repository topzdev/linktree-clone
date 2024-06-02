import {useSession} from "next-auth/react";
import React from "react";

const  useSessionToLocalStorage = () => {
    const {data: session} = useSession()

    React.useEffect(() => {
        if (window.localStorage.getItem("access-token")) // The info is already in localStorage, do nothing
            return
        // localStorage can only store strings, remember to parse it when you access it somewhere else.
        window.localStorage.setItem("access-token", session?.access_token || '')
    }, [session])
}


export default useSessionToLocalStorage;