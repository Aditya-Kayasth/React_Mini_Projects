import { useContext, createContext } from "react";

export const TodoContext = createContext({

    todos : [
        {
            id:1,
            todo: "message",
            completed: false
        }
                
    ],
        
        addTodo: (todo) => {},
        updateTodo: (id,todo) => {},
        toggleComplete: (id,complete) => {},
        deleteTodo: (id) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider 