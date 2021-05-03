import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DetailEditor.css'
import { completeDetail, deleteDetail } from '../actions/detail'
import CommentCard from '../components/CommentCard'

class DetailEditor extends Component {
    handleOnClick = (e) => {
        this.props.completeDetail(this.props.currentDetail, e.target.dataset.complete)
    }

    handleDelete = () => {
        this.props.deleteDetail(this.props.currentDetail.id)
    }

    render() {
        if (this.props.currentDetail) {
            return (
                <section className='detail-editor'>
                    <span>This detail is {this.props.currentDetail.completed ? 'Completed' : 'Incomplete'}</span>
                    {this.props.currentDetail.completed ? 
                        <button 
                            type='button'
                            data-complete="incomplete"
                            onClick={this.handleOnClick}
                        >
                            Mark Item Incomplete
                        </button>
                        :
                        <button 
                            type='button' 
                            data-complete="complete"
                            onClick={this.handleOnClick}
                        >
                            Mark Item Complete
                        </button>
                    }
                    {this.props.comments.map(comment =>
                        <CommentCard key={comment.id} comment={comment} />
                    )}
                    <button onClick={this.handleDelete} type='button'>Delete This Detail</button>
                </section>
            )
        
        } else {
            return (
                <section className="detail-editor">
                    Select a detail to edit
                </section>
            )
        }
    }
}

export default connect((state) => {
    return {
        details: state.detail.details,
        comments: state.detail.detailComments
    }
}, { completeDetail, deleteDetail })(DetailEditor)


