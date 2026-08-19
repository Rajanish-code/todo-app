function TodoApp(){
 
 const [Task , SetTask] = React.useState([]);
 const [Name,SetName] = React.useState("");
 const [Textarea,SetTextarea]=React.useState("");
 const [editId,SetEditId] = React.useState(null);
 const [message , Setmessage] = React.useState("");

function CreateTodoApp(){
    if(Name.trim()==="" && Textarea.trim()===""){
        return;
    }
   
    const addTask = {
        id:Date.now(),
        name:Name,
        textArea:Textarea
    }

   SetTask([...Task,addTask]);
   SetName("");
   SetTextarea("");
   ShowMessage("Task created successfully!");
}


function EditTodoApp(id){
const selectedTask = Task.find((e)=>e.id===id);
if(selectedTask){
    SetName(selectedTask.name);
    SetTextarea(selectedTask.textArea);
    SetEditId(id);
}
}


function updateTodoApp(){
    SetTask(
        Task.map((e)=>e.id===editId ? {...e,name:Name,textArea:Textarea}:e)
    );
    SetName("");
    SetTextarea("");
    SetEditId(null);
    ShowMessage("Task updated successfully!");
}

function DeleteTodoApp(id){
 SetTask(Task.filter((e)=>e.id !== id));
 ShowMessage("Task deleted successfully!");
}

function ShowMessage(text){
    Setmessage(text);
    setTimeout(()=>{
        Setmessage("");
    },2000);
}
    return (
        <>
         
        <section>
           
           <div class="todo-container">
             <h1>To-Do App</h1>
             <div class="input-container">
                <input  value={Name} onChange={(e)=>SetName(e.target.value)} placeholder="Enter the to-do name..."/>
                <textArea value={Textarea} onChange={(e)=>SetTextarea(e.target.value)} onKeyDown={(e)=>{
                    if(e.key ==="Enter"){
                        CreateTodoApp();
                    }
                }} class="todo-box">

                </textArea>
                <button onClick={editId !==null ? updateTodoApp:CreateTodoApp}>{editId !== null ? "Update Task":"Add Task"}</button>
             </div>
              <h1>To-Do List</h1>
               <div class="todo-header">
                  <ul>
                    <li>Name</li>
                    <li>Message</li>
                    <li>Action</li>
                  </ul>
                </div>
                {Task.map((e)=>
                    <div class="todo-list">
                    <h2>{e.name}</h2>
                    <p>{e.textArea}</p>
                    <div class="list-button">
                    <i class="fa-solid fa-pen-to-square" onClick={()=> EditTodoApp(e.id)}></i>
                    <i class="fa-solid fa-trash" onClick={()=> DeleteTodoApp(e.id)}></i>
                    </div>
                    </div>
                )}
                
           </div>
        </section>
        {message && (
                     <div className="success-message">
                     <i className="fa-solid fa-circle-check"></i>
                     <span>{message}</span>
                     </div>
               )}
       </>
    )
}



// using the react dom 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TodoApp/>);
