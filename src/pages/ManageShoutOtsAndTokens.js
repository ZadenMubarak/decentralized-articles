import React, {useState, useEffect} from 'react'

import { Editor } from 'primereact/editor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Blockies from 'react-blockies'; 
import { ProgressBar } from 'primereact/progressbar';

import { AppStateService } from '../Appstate-sevice/AppState.service';

const ManageSubscriptions = () => {
    const service = new AppStateService();
    // service.getSubScribers();
    // service.getMyListedFunctions()

    const [subscribers, setSubscribers] = useState([]);
    const [myListedFunctions, setMyListedFunctions] = useState([]);
    const [loading, setLoading] = useState(true);

    // const subscribers = service.subscribersResponse;
    // const myListedFunctions = service.cretaedFunctionsresponse;
    const itemsArray = service.polybaseResponse;
    console.log("from manage: ",  myListedFunctions);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use Promise.all to wait for both promises to resolve
                const [subData, listData] = await Promise.all([
                    service.getSubScribers(),
                    service.getMyListedFunctions()
                ]);

                setSubscribers(subData);
                setMyListedFunctions(listData);
                setLoading(false); // Set loading to false after data is fetched
                console.log("from manage: ", subData[0]);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once on mount

 
  return (
    <div>
        <div className="bg-primary-800 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap " style={{height:"12rem", background:`url(https://media.cryptoglobe.com/2020/08/zeus-capital-chainlink-dont-get-fooled-768x384.jpg)`}}>
            {/* <img src={data.image} style={{width:'180px', height:'180px', borderRadius:"20%", position:"relative", top:"45px"}}/> */}

            <div style={{borderRadius:"50%", position:"relative", top:"75px"}}> 
                <Blockies seed={`data.title`} size={25} scale={8} spotColor='#7ED7C1' color='#dfe' />

            </div>
        </div>

        <div style={{height:"132px"}}></div>

        {/* </div> */}

        {loading ? (
                <div>
                    Loading...
                    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                </div>
            ) : (
                // JSX to render the fetched data
                <div className='flex justify-content-center align-items-center'>
            <Card className='shadow-5' style={{width:'70%'}}>
                <span className="block text-2xl font-bold mb-1">view your function details and subscriptions </span>
                <div className="card">
                <TabView>
                    <TabPanel header="Listed">
                        <div className="card">
                        <Accordion>
                            <div style={{ height: "200px" }}></div>
                            <AccordionTab header={`function name: `}>
                                <p className="m-0">
                                    Function Address: 
                                </p>
                                <p className="m-0">
                                    Your wallet Address: 
                                </p>
                            </AccordionTab>
                        
                        </Accordion>        
                    </div>
                    </TabPanel>

                    <TabPanel header="Subscribed">
                        <Accordion >
                                <AccordionTab  header={`function name: `}>
                                    <p className="m-0">
                                        Function address: 
                                    </p>
                                </AccordionTab>
                                <div style={{height:"200px"}}></div>
                        </Accordion>
                        {/* <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} headerTemplate={header} readOnly style={{ height: '220px' }}/> */}
                    </TabPanel>

                </TabView>
            </div>
                <div style={{height:"20px"}}></div>
                {/* <Button  severity='primary' onClick={() => setVisible(true)} style={{position:"relative", left:"80%"}}> subscribe </Button> */}
                </Card>
            </div>
            )} 
        <div style={{height:"132px"}}></div>
        
    </div>
  )
}

export default ManageSubscriptions;