import React, {useState, useLayoutEffect} from 'react'
import { connect } from 'react-redux'
import './TopBar.css'
import Logout from '../components/auth/Logout'

function TopBar({ username }) {
    const [width, setWidth] = useState(0)

    useLayoutEffect(() => {
        function updateSize() {
          setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className='top-bar'>
            <div className="logo"></div>
            { width > 480 ?
                <h3>askaholik</h3>
            : null
            }
            <h2>
                Welcome back, {username}
            </h2>
            <Logout />
        </div>
    )
}

export default connect((state) => {
    return {
        username: state.auth.currentUser.username
    }
})(TopBar)


