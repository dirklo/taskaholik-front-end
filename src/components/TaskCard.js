import React from 'react'
import './TaskCard.css'

export default function TaskCard(props) {
    return (
        <div
            className={props.task.selected ? 'task-card selected' : 'task-card'}
            id={props.task.id} 
            onClick={(event) => {
                props.loadTask(event);
            }}>
            <h2>{props.task.title}</h2>
        </div>
    )
}

