
import { useEffect, useState } from "react";

function App(){
  const [title,setTitle] = useState("");
  const [tasks,setTasks] = useState([]);

  async function getTasks(){
    try{
      const response = await fetch('http://localhost:3000/api/tasks');
      const data = await response.json();
      setTasks(data);
    }
    catch(err){
      console.log(err);
    }
  }



  async function addTask(e) {
    e.preventDefault();
    if(!title.trim()){
      alert("Enter the task");
      return;
    }
    try {
      await fetch(
        "http://localhost:3000/api/tasks",
        {
          method: "POST",
          headers:{
            "Content-type":"application/json"
          },
          body: JSON.stringify({
            title,
          }),
        }
      );

      setTitle("");
      getTasks();
    }
    catch(err){
      console.log(err);
    }
    
  }


  async function deleteTask(id) {
    try{
      await fetch(`http://localhost:3000/api/tasks/${id}`,
       { method:"DELETE",

       },
      )
      getTasks();
    }catch(err){
      console.log(err);
    }
    
  }

  useEffect(()=>{
    getTasks();
  },[])


    return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h1>Task Manager</h1>

      {/* FORM */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <h3>No Tasks Found</h3>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            <span>{task.title}</span>

            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}





export default App;



















