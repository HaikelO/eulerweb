import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import ss from 'socket.io-stream';


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
        const socket = openSocket('http://localhost:8000/user');
        const link = ss.createStream();
        this.getPermissions().then((stream)=>{
            this.setState({hasMedia: true});
            try {
                this.publisher.srcObject = stream;
            } catch (e) {
                this.publisher.src = URL.createObjectURL(stream);
            }
            ss(socket).emit('stream', link);
            ss.createBlobReadStream(URL.createObjectURL(stream)).pipe(link);
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
                <video className='subscriber' ref={(ref)=>{this.subscriber = ref;}}></video>           
            </div>
        );
    }
}

export default VisioScreen;
