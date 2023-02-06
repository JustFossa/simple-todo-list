import { DragDropContext, Draggable, Droppable, DroppableStateSnapshot } from "@hello-pangea/dnd"
import { useState } from "react"
import {ImBin} from "react-icons/im"
import { changeCardOrder, changeTaskOrder, changeTaskType } from "../utils/api"
import { Task } from "./Task"
import { TaskList } from "./TaskList"

type Task = {
    _id: string,
    content: string
}
interface State {
    todo: Task[],
    completed: Task[],
    doing: Task[]
}

const colors = {
    "todo": "bg-red-500",
    "doing": "bg-orange-500",
    "completed": "bg-green-500"
}
const titles = {
    "todo": "To Do",
    "doing": "Doing",
    "completed": "Done"
}

export const ItemList = ({items, order, setOrder}: any) => {
    const [state, setState] = useState<State>(items)

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        if(destination.droppableId === "all") {
            const newOrder = Array.from(order)
            newOrder.splice(source.index, 1)
            newOrder.splice(destination.index, 0, result.draggableId.split("card")[0])
            changeCardOrder("63dfdd1095db3a77a3881859", "69", newOrder)
            return setOrder(newOrder)
        }
        if(destination.droppableId !== source.droppableId) {
            changeTaskType("63dfdd1095db3a77a3881859", "69", draggableId, destination.droppableId)
           const items1 = state[source.droppableId] || []
           const items2 = state[destination.droppableId] || []
           const [removed] = items1.splice(source.index, 1)
           items2.splice(destination.index, 0, removed)
            setState({
                ...state,
                [source.droppableId]: items1,
                [destination.droppableId]: items2,
            })

        }  else {
            const start = state[source.droppableId]
            const item = start.find(item => item._id === draggableId)
            start.splice(source.index, 1)
            start.splice(destination.index, 0, item)
            setState({
                ...state,
                [source.droppableId]: start,
            })
            changeTaskOrder("63dfdd1095db3a77a3881859", "69", state, source.droppableId)
        }
    }



    return(
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all" direction="horizontal" type="column">
                    {(provided, snapshot) => (
                        <div className="grid grid-cols-3 sm:grid-cols-1 gap-[5%] justify-items-center"  ref={provided.innerRef} {...provided.droppableProps}>
                            {order.map((item: "todo" | "doing" | "completed", index) => (
                                <Draggable key={item + "card"} draggableId={item + "card"} index={index}>
                                    {(provided, snapshot) => (
                                        <TaskList state={state} title={titles[item]} color={colors[item]} type={item} setState={setState} index={index} provided={provided}/>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>   
                    )}
                </Droppable>
            </DragDropContext>
        </> 
    )
}