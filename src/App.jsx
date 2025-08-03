import { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import confetti from 'canvas-confetti';
import Assistant from './components/Assistant';
import completeSound from './assets/sounds/sound1.mp3';
import './App.css';

const completeAudio = new Audio(completeSound);





function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([]) //This is the array which holds all the todos
  const [showFinished, setShowFinished] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false);





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

  
    if (!newTodos[index].isCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [
          '#00ffff',
          '#00e5ff',
          '#39ff14',
          '#7fff00',
          '#ccff00',
          '#ffffff',
          '#ff00ff',
          '#fffb00',
          '#00ffcc',
          '#66ff66',
        ]

      });

      // Play sound
      completeAudio.currentTime = 0; 
      completeAudio.play();
    }

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

  };


  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const ToggleSwitch = ({ isChecked, onToggle }) => {
    return (
      <div className="flex items-center gap-3 my-4">
        <span className=" font-medium text-white">Show Completed Tasks</span>
        <button
          onClick={onToggle}
          className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${isChecked ? 'bg-purple-500' : 'bg-gray-300'
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

      <div className="relative mt-4 ml-20 w-fit group">
        <div className="glow-dark-border iTask-box relative z-10 text-3xl font-bold italic text-white px-6 py-2 rounded-lg border border-blue-700">
          <span className="not-italic">Fallon</span>&nbsp;Studio
        </div>
      </div>

      <div className="relative flex justify-center items-start w-full">

        
        <div className="hover-glow panel mx-3 md:w-[45%] rounded-xl my-5 p-5 bg-slate-100 min-h-[80vh] border-2 border-[rgba(137,77,143,1)]">
          <h1 className=' font-bold text-center text-5xl text-[rgba(166,80,247,1)]'>iTask</h1>
          <h2 className='font-bold text-center text-2xl opacity-80 text-white'>"AI-Powered To-Do & Query Assistant"</h2>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className='text-3xl font-bold text-[rgba(166,80,247,1)]'>Add a Note</h2>
            <div className="flex">
              <input onChange={handleChange} value={todo} placeholder='Write your note here...' className='w-full border-2 bg-slate-300 border-purple-400 rounded-lg px-5 py-1' type="text" />
              <button disabled={todo.length <= 3} onClick={handleSave} className='bg-purple-800 hover:bg-green-700 disabled:bg-purple-600 text-sm font-bold p-4 py-2 text-white rounded-md cursor-pointer mx-2'>Save</button>
            </div>
          </div>

          <ToggleSwitch isChecked={showFinished} onToggle={toggleFinished} />
          <hr className='opacity-75 w-[90%] mx-auto my-3' />
          <h2 className='text-3xl font-bold text-[rgba(166,80,247,1)]'>Your Notes</h2>
          <div className="scrollbar-purple todos overflow-y-auto max-h-[250px] pr-2">
            {todos.length === 0 && <div className='m-5 text-white'>No notes to display</div>}
            {todos.map((item) => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
                <div className='flex gap-3'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className=' accent-blue-700 align-middle' />
                  <div className={`text-white text-xl ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-purple-600 hover:bg-slate-800 font-bold p-4 py-2 text-white rounded-md mx-1 cursor-pointer'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-600 hover:bg-slate-800 font-bold p-4 py-2 text-white rounded-md mx-1 cursor-pointer'><MdDeleteForever /></button>
                </div>
              </div>
            })}
          </div>
        </div>

        
        <div className="fixed top-20 right-6 flex flex-col rounded-xl bg-slate-800 text-white shadow-xl z-50 overflow-hidden">
          <Assistant />
        </div>

      </div>
    </>

  )
}

export default App
