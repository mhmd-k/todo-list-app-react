import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [taskValue, setTaskValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(value) {
    if (value.trim() === "" || value === null) return;
    setTasks((t) => [
      ...t,
      {
        id: t.length,
        readOnly: true,
        value: value,
        date: new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date()),
      },
    ]);
    setTaskValue("");
  }

  function handleEdit(id) {
    setTasks((t) => {
      return t.map((task) => {
        return task.id === id
          ? {
              ...task,
              readOnly: !task.readOnly,
              date: new Intl.DateTimeFormat("en-US", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date()),
            }
          : task;
      });
    });
  }

  function handleChange(event, id) {
    setTasks((t) => {
      return t.map((task) => {
        return task.id === id ? { ...task, value: event.target.value } : task;
      });
    });
  }

  function handleDelete(id) {
    setTasks((t) => {
      return t.filter((task) => task.id !== id);
    });
  }

  return (
    <div className="container">
      <div className="enter">
        {" "}
        <input
          ref={inputRef}
          type="text"
          name="task"
          placeholder="Add a Task"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask(taskValue);
          }}
        />
        <button id="new-task-submit" onClick={() => handleAddTask(taskValue)}>
          Add Task <FaPlus />
        </button>
      </div>
      <div className="content">
        {tasks.map((e) => {
          return (
            <Task
              key={e.id}
              task={e}
              handleChange={handleChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              readOnly={e.readOnly}
              content={e.value}
            />
          );
        })}
      </div>
      {tasks.length > 0 && (
        <button id="clear" onClick={() => setTasks([])}>
          Clear All Tasks
        </button>
      )}
    </div>
  );
}

export default App;
