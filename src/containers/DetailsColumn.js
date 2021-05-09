import React from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './DetailsColumn.css'
// import { setCurrentDetail } from '../actions/detail'
// import { deleteTask } from '../actions/task'
import { checkAuth } from '../actions/auth'
import NewCommentForm from '../components/NewCommentForm'
import CommentCard from '../components/CommentCard'
import DetailsList from '../components/DetailsList'


function DetailsContainer(props) {
    // const [showAddForm, setShowAddForm] = useState(false)
    // const [redirect, setRedirect] = useState(false)
    
    return (
        <section className='details-column'>
            {/* { redirect ? (<Redirect push to='./login' />) : null} */}
            <DetailsList />
            <section className='task-comments'>
                <NewCommentForm commentType='task' />
                <div className='comment-container'>
                    {props.comments.map(comment =>
                        <CommentCard 
                        key={comment.id} 
                        comment={comment} 
                        commentType="task" 
                        />
                    )}
                </div>
            </section>
        </section>
    ) 
}

export default connect((state) => {
    return {
        comments: state.task.taskComments
    }
}, { checkAuth })(DetailsContainer)


