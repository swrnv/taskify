import React, {useState, useEffect} from 'react';
import './App.css';
//importing components

import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  const [inputText , setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState();
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[])

  useEffect(() => {
  filterHandler();
  saveLocalTodos();
  },[todos, status]);

  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todos.completed === true))
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todos.completed === false))
        break;
        default :
         setFilteredTodos(todos);
         break
    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    
    <div className="App">
     <header>
       <h1>...Taskify... </h1>
     </header>
     <h5>made with  &nbsp; <i className="fas fa-heart"> </i> &nbsp; by &nbsp;<a href="https://github.com/swrnv"><b>&nbsp; swrnv</b></a></h5>
     <Form 
     inputText={inputText}
      todos={todos}
       setTodos={setTodos} 
       setInputText={setInputText}
       setStatus={setStatus} 
      />

     <TodoList 
     setTodos={setTodos} 
     todos={todos}
     filteredTodos={filteredTodos}
     />

    </div>
  );
}

export default App;
