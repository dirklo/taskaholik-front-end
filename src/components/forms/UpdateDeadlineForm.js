import React, {useState} from 'react'
import './UpdateDeadlineForm.css'
import { connect } from 'react-redux'
import { currentDetail, parseTimestamp } from '../../helpers/helpers'
import { updateDetail } from '../../actions/detail'
import Edit from '@material-ui/icons/Edit'
import DatePicker from 'react-datepicker'

function UpdateDeadlineForm({ updateDetail }) {

    const [showDeadlineSelect, setShowDeadlineSelect] = useState(false)
    const [deadline, setDeadline] = useState(null)

    return (
        <div className='update-deadline-form'>
            {!showDeadlineSelect ?
        <> 
        {currentDetail().deadline ?
            <>
                <div className='deadline'>
                    <span>
                        Deadline: {parseTimestamp(currentDetail().deadline)}
                    </span>
                    <Edit onClick={() => setShowDeadlineSelect(true)}/>
                </div>
            </>
        :
            <>
                <div className='no-deadline'>
                    <span>
                        No deadline
                    </span>
                <Edit onClick={() => setShowDeadlineSelect(true)}/>
                </div>
            </>
    }
    </>
:
    <div className='update-deadline'>
        <span>Deadline:</span>
        <br/>
        <form 
            action=""
            onSubmit={(e) => {
                e.preventDefault()
                updateDetail(currentDetail().id, {deadline: deadline})
                setShowDeadlineSelect(false)
            }}
            required
        >
            <DatePicker 
                selected={deadline}
                onChange={date => setDeadline(date)}
                showTimeSelect
                dateFormat="Pp"
                />
            <input type="submit" value="Save"/>
        </form>
        <button onClick={() => setShowDeadlineSelect(false)}>
            Cancel
        </button>
    </div>
}
        </div>
    )
}

export default connect((state) => {
    return {
        details: state.detail.details
    }
}, { updateDetail })(UpdateDeadlineForm)




