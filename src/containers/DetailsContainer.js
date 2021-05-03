import React, { useState } from 'react'
import { connect } from 'react-redux'
import './DetailsContainer.css'
import DetailEditor from '../components/DetailEditor'
import { setCurrentDetail } from '../actions/detail'
import NewDetailForm from '../components/NewDetailForm'

function DetailsContainer(props) {
    const [showAddForm, setShowAddForm] = useState(false)

    let currentDetail = props.details.find(detail => detail.selected === true)
   
    return (
        <div className='details-container'>
            <section className='details-list'>
                <h2>Details:</h2>
                {props.details.map(detail => 
                    <div 
                        key={detail.id}
                        className={detail.selected? 'detail-card selected' : 'detail-card'}
                        data-id={detail.id}
                        onClick={e => props.setCurrentDetail(
                            parseInt(e.target.dataset.id)
                        )}
                    >
                        {detail.content}
                    </div>
                )}
                <button 
                    type='button'
                    className={!showAddForm ? 'show' : 'hide'}
                    onClick={(e) => setShowAddForm(true)}
                >
                    + Add New Detail
                </button>
                <button 
                    type='button'
                    className={showAddForm ? 'show' : 'hide'}
                    onClick={(e) => setShowAddForm(false)}
                >
                    + Cancel
                </button> 
                <NewDetailForm 
                    showAddForm={showAddForm} 
                    setShowAddForm={setShowAddForm} 
                />
            </section>
            <DetailEditor currentDetail={currentDetail}/>
        </div>
    ) 
}

export default connect((state) => {
    return {
        details: state.detail.details,
    }
}, { setCurrentDetail })(DetailsContainer)


