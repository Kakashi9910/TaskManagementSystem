import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "./stiches.config";

const StyledColumn = styled("div", {
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  marginTop: 8,
  h2: {
    margin: 0,
    padding: "0 16px",
  },
});

const StyledList = styled("div", {
  backgroundColor: "#ddd",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
});

const Column = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <StyledColumn>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            <h5
              className={`w-50 fw-light fs-6 border rounded p-2 ${
                id === "Todo"
                  ? "bg-warning"
                  : id === "Inprogress"
                  ? "bg-info"
                  : "bg-success"}`
              }
            >
              {id}
            </h5>

            {list.map((task, index) => (
              <Item
               tag={task.tag}
                key={task.description}
                title={task.title}
                draggableId={task._id}
                text={task.description}
                index={index}
              />
            ))}
            {provided.placeholder}
          </StyledList>
        </StyledColumn>
      )}
    </Droppable>
  );
};

export default Column;
