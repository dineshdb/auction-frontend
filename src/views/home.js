import React from 'react'
import LoginBar from '../components/appBar/index'
import Products from '../components/product/index'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
class Home extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            index: 4
        }
        
    }
    handleNext()
        {
            if(this.state.index < 8)
            {
            this.setState({
                index: this.state.index+4
            })
            console.log(this.state.index)
            }
            else{
                this.setState({
                    index: 0
                })
            }
        }

        
    handleBack()
        {
            if(this.state.index > 4){
            this.setState({
                index: this.state.index-4
            })}
            else{
                this.setState({
                    index: 0
                })
            }
        }

        
   
    render(){
        return (
            <div>
                {console.log(this.state.index)}
            <LoginBar/>
                <Products index = {this.state.index}/>
            <Button 
                onClick = {this.handleNext.bind(this)}
            >
            Next
                
            </Button>
            <Button 
                onClick = {this.handleBack.bind(this)}
            >
            Back
                
            </Button>
            </div>
            )
}
}
export default Home;