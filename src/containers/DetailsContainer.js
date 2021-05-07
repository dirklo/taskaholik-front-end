import React, { useState } from 'react'
import { connect } from 'react-redux'
import './DetailsContainer.css'
import DetailEditor from '../components/DetailEditor'
import { setCurrentDetail } from '../actions/detail'
import { deleteTask } from '../actions/task'
import NewDetailForm from '../components/NewDetailForm'
import { currentTask } from '../helpers/helpers'


function DetailsContainer(props) {
    const [showAddForm, setShowAddForm] = useState(false)
    
    return (
        <div className='details-container'>
            <h2>Details:</h2>
                <div className="details-sections">
                    {currentTask() ?
                        <section className='details-list'>
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
                            <button
                                onClick={(e) => props.deleteTask(currentTask.id)}    
                                >
                                Delete This Goal
                            </button>
                        </section>
                    :
                        <section className="details-list">
                            <span>Select a task to load details</span>
                        </section>
                    }
                    <DetailEditor />
                </div>
        </div>
    ) 
}

export default connect((state) => {
    return {
        tasks: state.task.tasks,
        details: state.detail.details,
    }
}, { setCurrentDetail, deleteTask })(DetailsContainer)


