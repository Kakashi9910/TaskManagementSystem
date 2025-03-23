import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { styled } from './stiches.config'


const StyledItem = styled('div', {
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  backgroundColor: '#eee',
  borderRadius: 4,
  padding: '4px 8px',
  transition: 'background-color .8s ease-out',
  marginTop: 8,
  height:'120px',
  ':hover': {
    backgroundColor: '#fff',
    transition: 'background-color .1s ease-in'
  }
})

const Item = ({ text,tag, index,draggableId,title }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => (
        <StyledItem 
          data-toggle = 'tooltip'
          title= {text}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {title}
        <div className='fw-light fs-6'>
          {tag}
        </div>
        </StyledItem>
      )}
    </Draggable>
  )
}

export default Item
