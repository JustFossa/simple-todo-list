import { DragDropContext, Draggable, Droppable, DroppableStateSnapshot } from "@hello-pangea/dnd"
import { useState } from "react"
import {ImBin} from "react-icons/im"
import { changeTaskOrder, changeTaskType } from "../utils/api"
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

export const ItemList = ({items}: any) => {
    const [state, setState] = useState<State>(items)

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
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
                <TaskList setState={setState} state={state} title="To Do" color="bg-red-500" type="todo" />
                <TaskList setState={setState} state={state} title="Doing" color="bg-orange-500" type="doing" />
                <TaskList setState={setState} state={state} title="Done" color="bg-green-500" type="completed" />

            </DragDropContext>
        </> 
    )
}