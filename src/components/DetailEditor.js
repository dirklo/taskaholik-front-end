import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DetailEditor.css'
import { completeDetail } from '../actions/detail'

class DetailEditor extends Component {
    handleOnClick = (e) => {
        this.props.completeDetail(this.props.currentDetail)
    }

    render() {
        if (this.props.currentDetail) {
            return (
                <section className='detail-editor'>
                    {this.props.comments.map(comment =>
                        <div className='detail-comment'>
                            {comment.content} by <strong>{comment.author}</strong>
                        </div>
                    )}
                    <span>This detail is {this.props.currentDetail.completed ? 'Completed' : 'Incomplete'}</span>
                    {!this.props.currentDetail.completed ? 
                        <button 
                            type='button' 
                            onClick={this.handleOnClick}
                        >
                            Mark Item Complete
                        </button>
                        :
                        null
                    }
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
}, { completeDetail })(DetailEditor)


