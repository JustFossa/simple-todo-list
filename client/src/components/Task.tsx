import { Draggable } from "@hello-pangea/dnd"
import { useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import { ImBin2 } from "react-icons/im"
import {BsThreeDots} from "react-icons/bs"
import {RxCross2} from "react-icons/rx"
import { deleteTask } from "../utils/api"
import { ContextMenu } from "./ContextMenu"
import { ContextMenuItem } from "./ContextMenuItem"
import { ContextMenuForm } from "./ContextMenuForm"
export const Task = ({index, item, draggableId, color, setState, state}) => {
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        deleteTask("63dfdd1095db3a77a3881859", "69", item._id).then(res => {
            setState(res.data.tasks)
        })
    }
    return (
        <Draggable key={item._id} draggableId={draggableId} index={index}>
            {(provided, snapshot) => (  
                <li key={item._id} onContextMenu={(e) => {e.preventDefault(); setOpen(!open)}} className={`bg-white items-center relative p-1 rounded-md text-left flex gap-[2%] break-all max-w-[100%] hover:bg-gray-200 shadow-md group hover:cursor-pointer`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className={`w-[30px] h-[30px] rounded-md ${color}`}></div>
                    <h1 className="break-all max-w-[80%]">{item.content}</h1>
                    <BsThreeDots onClick={() => {setOpen(!open)}} size={29} className="text-gray-400 hover:text-gray-600 ml-auto cursor-pointer rounded-[0.2rem] hover:bg-gray-300 p-[6px] hidden group-hover:block" />
                    {
                        open &&(
                            <>
                            <ContextMenu setOpen={setOpen}>
                                <ContextMenuItem action={handleDelete}><ImBin2 size={20} className="mr-2" />Delete</ContextMenuItem>
                                <ContextMenuItem><AiFillEdit size={20} className="mr-2" />Edit</ContextMenuItem>
                                <ContextMenuItem action={() => {setOpen(false)}}><RxCross2 size={20} className="mr-2" />Close</ContextMenuItem>
                            </ContextMenu>
                            <ContextMenuForm action={() => {}}>
                                    <textarea rows={4} className="w-full p-2 resize-none outline-none rounded-md shadow-md"placeholder="Enter a title for this card..." />
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-[0.25rem] py-1 px-2">Save</button>
                            </ContextMenuForm>
                            </>
                        )
                    }
                </li>
            )}
        </Draggable>
    )
}