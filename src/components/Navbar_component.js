import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';

import './static/Navbar.css'

import { AppStateService } from '../Appstate-sevice/AppState.service';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [buttonText, setButtonText] = useState('Connect Wallet')
    const [connected, setConnected] = useState(false)

    const navigate = useNavigate();
    const service = new AppStateService();

    console.log("from navbar: ", service.connected);

    const connect = () => {
        service.connectToMetaMask()
        setButtonText('connected')
    }

    const startContent = (
        <React.Fragment>
            <Button color='blue' icon="pi pi-bars p-toolbar-separator mr-2" className="p-button mr-2" onClick={() => setVisible(true)} severity="secondary" text />
            {/* <Button label="Rapid.Oracle" text disabled severity='info' /> */}
            <div className="pl-3 mr-2 flex align-items-center justify-content-center">
                <Link to="/" className="no-underline">
                <span className='flex pr-2 pt-1 block text-1xl font-bold mb-1 text-blue-600'>ShoutOut.token</span>
                    {/* Link with no underline */}
                </Link>
            </div>

            <Sidebar title='Side Bar' visible={visible} onHide={() => setVisible(false)} >

                <Divider />
                <Button icon='pi pi-home' size='large' text raised className='w-full' onClick={() => {navigate('/'); setVisible(false)}}>
                    <span className='flex pl-6 block text-1xl font-bold mb-1"'> Home </span>
                </Button>

                <div style={{height:'5px'}}></div>
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-folder-open' onClick={() => {navigate('/documentation'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'> Docs </span>
                </Button>
                <div style={{height:'5px'}}></div>
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-desktop' onClick={() => {navigate('/tutorials'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'> Tutorials </span>
                </Button>
                <div style={{height:'5px'}}></div>
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-plus' onClick={() => {navigate('/list-function'); setVisible(false)}} disabled={!service.connected}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'>{service.connected ? "List Token":"connect to access"}</span>
                </Button>
                <div style={{height:'5px'}}></div> 
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-eye' onClick={() => {navigate('/view-functions-cards'); setVisible(false)}}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'>View Shout outs</span>
                </Button>
                <div style={{height:'5px'}}></div> 
                <Button size='large' text raised style={{width:"100%"}} icon='pi pi-wrench' onClick={() => {navigate('/manage-subscriptions'); setVisible(false)}} disabled={!service.connected}>
                    <span className='flex pl-2 block text-1xl font-bold mb-1"'>{service.connected ? "Manage":"connect to access"}</span>
                </Button>
            </Sidebar>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <Button label={service.connected ? `${service.walletAddress.slice(0, 6)}...${service.walletAddress.slice(-4)}`: "Connect Wallet"} icon="pi pi-id-card" className="p-button-help mr-2 h-3rem" onClick={connect} />
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} end={endContent} style={{width:"95%", zIndex:"1"}} className='toolBar '/>
        </div>
    );
}

export default Navbar;
