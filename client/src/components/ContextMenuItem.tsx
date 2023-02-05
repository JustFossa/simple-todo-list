import { ReactNode } from "react"

export const ContextMenuItem = ({children, action = () => {}}: {children: ReactNode[] | ReactNode, action?: (...args: any[]) => void | Promise<any>}) => {
    return(
        <>
        <li onClick={action} className="flex rounded-[0.2rem] py-[2px] px-2 w-max opacity-80 hover:text-white text-gray-400 cursor-pointer items-center hover:translate-x-[5px] ease-in-out transition-all duration-150 bg-black">{children}</li>
        </>
    )
}