import { ReactNode, useState } from "react"
import { ContextMenuItem } from "./ContextMenuItem"
import {AiFillEdit} from 'react-icons/ai';
import { deleteTask } from "../utils/api";
export const ContextMenu = ({children, setOpen}: {children: ReactNode | ReactNode[] | null, setOpen: (arg0: boolean) => void}) => {
    return(
        <>
        <div onClick={() => {setOpen(false)}} className="w-full h-full fixed top-0 left-0 bg-black opacity-20 z-[5]">
        </div>
        <div className="absolute left-[102%] top-0 z-10">
            <ul className="list-none text-white flex-col flex gap-[5px]">
                {children}
            </ul>
        </div> 
        </>
    )
}