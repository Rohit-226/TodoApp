import React, { useState, useRef, useEffect } from 'react'

import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
    //as we already stored the todos list with nam ekey todos in local storage, her use state take from the local storage it did not disappear the todos list after refreshing 
    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const inputRef = useRef();
    const add = ()=>{
        //if we also write the space in input fiels, then it will also appear in console.log, to avoid this space we write the trim() w
        const inputText = inputRef.current.value.trim();
        
        //if we did not have any text in input, then below code will not executed
        if(inputText=== ""){
            return null;
        }
        //generating unique id's for creating every to-dolist
        const newTodo = {
            id: Date.now(), 
            text: inputText,
            isComplete: false
        }
        setTodoList((prev)=> [...prev, newTodo]);
        //after clicking on add button , below line remove the inputText
        inputRef.current.value = ""
        console.log(inputText)
    }

    const deleteTodo = (id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.filter((todo)=> todo.id !== id)
        })
    }

    const toggle = (id)=>{
        setTodoList((prevTodos) => {
            return prevTodos.map((todo)=> {
                if(todo.id===id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        //storing items in local storage i.e todo list
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

  return (
    <div className='bg-white place-self-center w-3/8 max w-m flex flex-col p-6 min-h-[480px] rounded-xl'>

        {/*-------title-------  */}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-2xl font-semibold '>To-Do List</h1>
        </div>

        {/* -----input------- */}
        <div className='flex items-center my-5 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-3 h-10 pl-2 pr-0 placeholder: text-slate-600 ' type="text" placeholder='Add your task' />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add+</button>
        </div>

        {/* -----todo-list----- */}
        <div>
            {todoList.map((item, index)=>{
                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
            })}

        </div>
    </div>
  )
}

export default Todo