import { FaEdit, FaTrash } from "react-icons/fa";
import { useRef } from "react";
function Task(props) {
  const inputRef = useRef();
  return (
    <>
      <div className="task">
        <div className="task-input">
          {" "}
          <input
            ref={inputRef}
            type="text"
            name={"task-" + props.task.id}
            value={props.content}
            onChange={(e) => {
              props.handleChange(e, props.task.id);
            }}
            readOnly={props.readOnly}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.handleEdit(props.task.id);
              }
            }}
          />
          <button
            id="edit"
            onClick={() => {
              props.handleEdit(props.task.id);
              inputRef.current.focus();
            }}
          >
            {props.task.readOnly ? `Edite ` : "Done "}
            <FaEdit />
          </button>
          <button
            id="delete"
            onClick={() => {
              props.handleDelete(props.task.id);
            }}
          >
            Delete <FaTrash></FaTrash>
          </button>
        </div>
        <div className="date">Last Edit: {props.task.date}</div>
      </div>
    </>
  );
}

export default Task;
