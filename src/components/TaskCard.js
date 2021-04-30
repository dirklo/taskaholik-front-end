import React from 'react'
import './TaskCard.css'

export default function TaskCard(props) {
    return (
        <div
            id={props.task.id} 
            className={props.currentTask === props.task.id
                ? 
                'task-card selected' 
                : 
                'task-card'}
            onClick={(event) => {
                props.loadTask(event);
            }}>
            <h2>{props.task.title}</h2>
        </div>
    )
}

