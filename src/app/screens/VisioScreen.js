import React, { Component } from 'react';

import './VisioScreen.css';

class VisioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMedia: false,
            otherUserId: null
        };
    }

    componentDidMount(){
        this.getPermissions().then((stream)=>{
            this.setState({hasMedia: true});
            try {
                this.publisher.srcObject = stream;
            } catch (e) {
                this.publisher.src = URL.createObjectURL(stream);
            }

            this.publisher.play();
        });
    }

    getPermissions() {
        return new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((stream)=>{
                res(stream);
            })
            .catch(err => {
                console.log(`getPermissions error ${err}`);
            });
        })
    }
    render() {
        return (
            <div>
                VisioScreen   
                <video className='publisher' ref={(ref)=> {this.publisher = ref;}}></video>
                {/* <video className='subscriber'></video>  */}            
            </div>
        );
    }
}

export default VisioScreen;
