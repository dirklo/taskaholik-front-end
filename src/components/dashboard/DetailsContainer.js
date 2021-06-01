import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './DetailsContainer.css'
import { useQuery, useMutation } from 'react-query'
import { fetchTaskComments, createTaskComment, deleteTaskComment } from '../../queries/taskComments'
import NewCommentForm from '../forms/NewCommentForm'
import CommentCard from '../cards/CommentCard'
import DetailsList from './DetailsList'

function DetailsColumn({ tasks }) {

    const { isLoading, error, data: comments, refetch, remove } = useQuery("taskComments", fetchTaskComments)

    const { mutate: mutateAddComment } = useMutation(createTaskComment, {
        onSuccess: () => {
            refetch()
        }
    })

    const { mutate: mutateDeleteComment } = useMutation(deleteTaskComment, {
        onSuccess: () => {
            refetch()
        }
    })

    useEffect(() => {
        remove()
        refetch()
    }, [tasks, refetch, remove])
    
    if (error) return "An Error Occured: " + error.message

    return (
        <section className='details-container'>
            <DetailsList />
            <br/>
            <br/>
            <section className='task-comments'>
                <NewCommentForm 
                    commentType='task' 
                    addComment={(comment) => mutateAddComment(comment)}
                    />
                <div className='comment-container'>
                    {!isLoading && comments ?
                        comments.map(comment =>
                            <CommentCard 
                            key={comment.id} 
                            comment={comment} 
                            commentType="task" 
                            deleteComment={(comment) => mutateDeleteComment(comment)} 
                            />
                        )
                        : "LOADING..."
                    }
                </div>
            </section>
        </section>
    ) 
}

export default connect((state) => {
    return {
        comments: state.task.taskComments,
        tasks: state.task.tasks
    }
})(DetailsColumn)


