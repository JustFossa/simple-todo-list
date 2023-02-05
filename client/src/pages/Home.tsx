import { DragDropContext } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"
import { ItemList } from "../components"
import { getBoard } from "../utils/api"

type Task = {
    _id: string,
    content: string
}
interface State {
    todo: Task[],
    completed: Task[],
    doing: Task[]
}

export const Home = () => {
    const [state, setState] = useState<State | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBoard("63dfdd1095db3a77a3881859", "69").then((res) => {
            const {data} = res
            setState(data.tasks)
            setLoading(false)
        })
    }, [])
    return !loading && (
        <div className="grid grid-cols-3 sm:grid-cols-1 sm:gap-[5%]">
                <ItemList items={state} />
        </div>        
    )
}  