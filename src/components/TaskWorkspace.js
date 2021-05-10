import React from 'react'
// import { connect } from 'react-redux'
// import NewCommentForm from './NewCommentForm'
// import { removeTaskComment } from '../actions/task'
import DetailsColumn from '../containers/DetailsColumn'
// import CommentCard from '../components/CommentCard'
import DetailEditor from '../components/DetailEditor'
import { currentTask } from '../helpers/helpers'
import './TaskWorkspace.css'

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


