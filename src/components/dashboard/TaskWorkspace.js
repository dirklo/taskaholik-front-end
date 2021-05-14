import React from 'react'
import './TaskWorkspace.css'
import DetailsColumn from './DetailsColumn'
import DetailEditor from './DetailEditor'
import { currentTask } from '../../helpers/helpers'

export default function TaskWorkspace() {

    if (currentTask()) {
        return (
            <section className='task-workspace'>
                <DetailsColumn />
                <DetailEditor />
            </section>
        )
    } else {
        return (
            <section className='task-workspace'>
                <div className="no-task-placeholder">
                    <div className="logo"></div>
                </div>
            </section>
        )
    }

}


