import React, { Component } from 'react'
import { connect } from 'react-redux'

class TaskWorkspace extends Component {
    render() {
        return (
            <div>
                <ul>
                {this.props.details.map(detail => 
                    <ul>
                        <li key={detail.detail.id}>{detail.detail.content}</li>
                        {detail.comments.map(comment =>
                            <ul>
                                <li key={comment.id}>{comment.content}</li>
                            </ul>
                        )}
                    </ul>  
                )}
                </ul>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        details: state.task.details,
        comments: state.task.comments
    }
})(TaskWorkspace)
