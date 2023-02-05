import { ReactNode } from "react";

export const ContextMenuForm = ({children, action}: {children: ReactNode | ReactNode[] | null, action: (...args: any[]) => any}) => {
    return(
        <form className="absolute z-10 top-0 w-full right-1" onSubmit={action}>
            {children}
        </form>
    )
}