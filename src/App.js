import React from 'react'
import LoginBar from './components/appBar/index'
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import LoginDialogBox from './components/appBar/loginDialogBox'
import SignUpDialogBox from './components/appBar/signUp'
class App extends React.Component {
    render() {
        return (
            <Router>
                <div >
                    <Route path = "/" exact strict render={
                        () => <LoginBar/>
                    } />
                    <Route path = "/login" exact strict component={
                        () => (
                            <div>
                            <LoginDialogBox/>
                            </div>
                        )
                        }
                    />
                    <Route path = "/signup" exact strict component={
                        () => (
                            <div>
                            <SignUpDialogBox/>
                            </div>
                        )
                        }
                    />
                </div>
            </Router>


        )
    }
}

export default App;
