import { Droppable } from "@hello-pangea/dnd"
import { Task } from "./Task"
import {AiOutlinePlus} from "react-icons/ai"
import { useState } from "react"
import { createTask } from "../utils/api"
import {RxCross2} from "react-icons/rx"
import { isEmpty } from "lodash";

type Task = {
    _id: string,
    content: string
}
interface State {
    todo: Task[],
    completed: Task[],
    doing: Task[]
}

interface TaskListProps {
    state: State,
    title: string,
    color: string,
    type: "todo" | "completed" | "doing",
    setState: (state: State) => void,
}

export const TaskList = ({state, title, color, type, setState}: TaskListProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [content, setContent] = useState<string>("")

    const handleSubmit = (e) => {
        e.preventDefault()
        createTask("63dfdd1095db3a77a3881859", "69", content, type).then(res => {
            setState({
                ...state,
                [type]: [...state[type], res.data]
            })
            setContent("")
            setOpen(false)
        })
    }
    return (
        <>
             <div className="bg-gray-100 p-4 rounded-lg w-[80%] self-center mb-auto">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <Droppable droppableId={type}>
                        {(provided, snapshot) => (
                            <ul className="flex flex-col p-2 gap-[5px]" {...provided.droppableProps} ref={provided.innerRef}>
                                {state[type].map((item, index) => (
                                    <Task key={item._id} index={index} draggableId={item._id} item={item} color={color} setState={setState} state={state} />
                                ))}
                               {provided.placeholder}
                               {
                                    open && (
                                        <form onSubmit={handleSubmit}> 
                                            <textarea onChange={(e) => {setContent(e.target.value)}} rows={4} className="w-full p-2 resize-none outline-none rounded-md shadow-md"placeholder="Enter a title for this card..." />
                                            <div className="flex justify-start items-center gap-[5px]">
                                                <button type="submit" className="bg-blue-500 text-white p-1 rounded-[0.2rem] hover:bg-blue-600">Add Card</button>
                                                <RxCross2 onClick={(e) => {setOpen(false)}} size={28} className="cursor-pointer text-gray-600 hover:text-black" />
                                            </div>
                                        </form>
                                    )
                               }
                               {!open && <li onClick={(e) => {setOpen(true)}} className="flex items-center text-gray-400 cursor-pointer hover:bg-gray-300 p-2 rounded-md"><AiOutlinePlus size={25} /> Add Card</li>}
                            </ul>   
                        )}
                    </Droppable>
                </div>
        </>
    )
}