import React, { Component } from 'react'
import { connect } from 'react-redux'

class CommentCard extends Component {
    deleteButton = (comment) => {
        if (this.props.currentUser.id === comment.author_id) {
            return <button 
                type='button'
                data-id={comment.id}
                onClick={this.handleDelete}
            >
                Delete Comment
            </button>
        }else{
            return null
        }
    }

    handleDelete = (e) => {
        this.props.removeTaskComment(e.target.dataset.id)
    }

    render() {
        return (
            <fieldset key={this.props.comment.id}>
            <h3>{this.props.comment.author} said:</h3>
            <span>{this.props.comment.content}</span>
            <p>at: {this.props.comment.created_at}</p>
            {this.deleteButton(this.props.comment)}
            </fieldset>
        )
    }
}

export default connect((state) => {
    return {
        currentUser: state.auth.currentUser
    }
})(CommentCard)
