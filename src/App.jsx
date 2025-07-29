import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import confetti from 'canvas-confetti';
import app from './firebase';

// Optional: if using Firestore, Auth, etc.
import { getFirestore } from 'firebase/firestore';
const db = getFirestore(app);


function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([]) //This is the array which holds all the todos
  const [showFinished, setShowFinished] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false);


  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos")
  //   if (todoString) {
  //     let todos = JSON.parse(localStorage.getItem("todos"))
  //     setTodos(todos)
  //   }
  // }, [])

  // const saveToLocalStorage = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }

  
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("Saved todos after load:", todos);
    }
  }, [todos, hasLoaded]);



  const handleEdit = (e, id) => {
    console.log("edit button clicked")
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    // saveToLocalStorage()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    // saveToLocalStorage()
  }

  // const handleSave = () => {
  //   setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
  //   setTodo("")
  //   console.log(todos)
  //   // saveToLocalStorage()
  // }
  const handleSave = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    setTodos(prev => [...prev, newTodo]);  // safer than using current state
    setTodo("");
  };


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log("target id : ", id);

    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];

    // Only trigger confetti if marking as completed
    if (!newTodos[index].isCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // saveToLocalStorage();
  };


  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const ToggleSwitch = ({ isChecked, onToggle }) => {
    return (
      <div className="flex items-center gap-3 my-4">
        <span className="text-sm font-medium text-gray-700">Show Completed Tasks</span>
        <button
          onClick={onToggle}
          className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${isChecked ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'
              }`}
          ></div>
        </button>
      </div>
    );
  };




  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto md:w-[43%] rounded-xl my-5 p-5 bg-slate-100 min-h-[80vh]">
        <h1 className='font-bold text-center text-3xl'>NotePilot</h1>
        <h2 className='font-bold text-center text-xl opacity-75'>"Your Co-Pilot in Productivity"</h2>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Note</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} placeholder='Write your note here...' className='w-full border-2 bg-white border-slate-300 rounded-lg px-5 py-1' type="text" />
            <button disabled={todo.length <= 3} onClick={handleSave} className='bg-blue-800 hover:bg-green-700 disabled:bg-blue-600 text-sm font-bold p-4 py-2 text-white rounded-md cursor-pointer mx-2'>Save</button>
          </div>
        </div>
        <ToggleSwitch isChecked={showFinished} onToggle={toggleFinished} />
        <hr className='opacity-75 w-[90%] mx-auto my-3' />
        <h2 className='text-2xl font-bold'>Your Notes</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No notes to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-3'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className=' accent-blue-700 align-middle'/>
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-700 hover:bg-slate-950 text-sm font-bold p-3 py-1 text-white rounded-md mx-1 cursor-pointer'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-700 hover:bg-slate-950 text-sm font-bold p-3 py-1 text-white rounded-md mx-1 cursor-pointer'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
