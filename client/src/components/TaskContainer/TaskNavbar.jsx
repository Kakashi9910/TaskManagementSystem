
import { useState } from "react";
import { List, LayoutGrid } from "lucide-react"; // Icons

const TaskNavbar = ({activeView,setActiveView}) => {

  return (
    <div className="d-flex align-items-center border border-dark rounded">
      {/* List View Button */}
      <button
        className={`btn btn-link text-decoration-none d-flex align-items-center mx-2 ${
          activeView === "list" ? "fw-bold text-dark" : "text-muted"
        }`}
        onClick={() => setActiveView("list")}
      >
        <List size={18} className="me-1" />
        List
        {activeView === "list" && <div className="underline" />}
      </button>

      {/* Board View Button */}
      <button
        className={`btn btn-link text-decoration-none d-flex align-items-center mx-2 ${
          activeView === "board" ? "fw-bold text-dark" : "text-muted"
        }`}
        onClick={() => setActiveView("board")}
      >
        <LayoutGrid size={18} className="me-1" />
        Board
        {activeView === "board" && <div className="underline" />}
      </button>
      
      {/* Custom CSS for underline effect */}
      <style>
        {`
          .underline {
            width: 100%;
            height: 2px;
            background-color: black;
            margin-top: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default TaskNavbar;
