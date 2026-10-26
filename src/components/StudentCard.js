
import { useState } from "react";

function StudentCard(props) {
  const [active, setActive] = useState(true);

  return (
    <div className="student-card">
      <h2>{props.name}</h2>

      <p>Course: {props.course}</p>
      <p>Role: {props.role}</p>

      <p>
        Status: {active ? "Active" : "Inactive"}
      </p>

      <button onClick={() => setActive((previous) => !previous)}>
        Change Status
      </button>
    </div>
  );
}

export default StudentCard;
