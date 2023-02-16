import { FaEdit, FaTrash } from "react-icons/fa";
function Task(props) {
  return (
    <>
      <div className="task">
        <div className="task-input">
          {" "}
          <input
            type="text"
            name={"task-" + props.task.id}
            value={props.content}
            onChange={(e) => {
              props.handleChange(e, props.task.id);
            }}
            readOnly={props.readOnly}
          />
          <button
            id="edit"
            onClick={() => {
              props.handleEdit(props.task.id);
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
        <div className="date">{props.task.date}</div>
      </div>
    </>
  );
}

export default Task;
