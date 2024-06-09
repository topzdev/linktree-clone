'use client'

import {SessionProvider} from "next-auth/react"

export default function ClientSessionProvider({
                                                  children,
                                                  session
                                              }: {
    children: React.ReactNode
    session: any
}): React.ReactNode {
    return <SessionProvider refetchOnWindowFocus={false} session={session}>
        {children}
    </SessionProvider>
}