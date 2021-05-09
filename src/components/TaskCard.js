import React from 'react'
import './TaskCard.css'

export default function TaskCard({ task, loadTask }) {
    return (
        <div
            className={task.selected ? 'task-card selected' : 'task-card'}
            id={task.id} 
            onClick={(e) => {
                loadTask(e);
            }}>
            <h2>{task.title}</h2>
        </div>
    )
}

