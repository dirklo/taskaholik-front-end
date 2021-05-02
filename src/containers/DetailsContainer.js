import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DetailsContainer.css'
import DetailEditor from '../components/DetailEditor'
import { setCurrentDetail } from '../actions/detail'

class DetailsContainer extends Component {

    handleOnClick = (e) => {
        this.props.setCurrentDetail(parseInt(e.target.dataset.id))
    }

    render() {
        let currentDetail = this.props.details.find(detail => detail.selected === true)
        return (
            <div className='details-container'>
                <section className='details-list'>
                    <h2>Details:</h2>
                    {this.props.details.map(detail => 
                        <div 
                            key={detail.id}
                            className={detail.selected? 'detail-card selected' : 'detail-card'}
                            data-id={detail.id}
                            onClick={this.handleOnClick}
                        >
                            {detail.content}
                        </div>
                    )}
                </section>
                <DetailEditor currentDetail={currentDetail}/>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        details: state.detail.details,
    }
}, { setCurrentDetail })(DetailsContainer)


