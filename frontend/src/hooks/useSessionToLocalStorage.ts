import {useSession} from "next-auth/react";
import React from "react";

const  useSessionToLocalStorage = () => {
    const {data: session} = useSession()

    React.useEffect(() => {
        // localStorage can only store strings, remember to parse it when you access it somewhere else.
        window.localStorage.setItem("access-token", session?.access_token || '')
    }, [session])
}


export default useSessionToLocalStorage;