import React from 'react'
import NavigationBar from './components/appBar/appBar.js'
import UserList from './containers/userlist'
class App extends React.Component {
    render() {
        return (
            <div>
            <NavigationBar/>
            <UserList/>
            </div>


        )
    }
}

export default App;
