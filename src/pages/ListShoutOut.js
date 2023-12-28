import React, { useState, useRef } from "react";

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";

import { market_card } from "../models/market_card_model";
import { AppStateService } from "../Appstate-sevice/AppState.service";

const ListFunctions = () => {
    const [section, setSection] = useState(0);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [functionContractAddress, seFunctionContractAddress] = useState('');
    const [creatorAddress, setCreatoAddress] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [usage, setUsage] = useState('');
    const [checked, setChecked] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const service = new AppStateService();
    let yes = '';
    let paid = '';
    const arrayIdIndex = [service.polybaseResponse[0]]

    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { name: 'Yes', code: 'Y' },
        { name: 'No', code: 'N' },

    ];

    const toast = useRef(null);

    
    const nextSection = () => {
        setSection(section + 1);
    }

    const submissionButtonEventHandling = () => {
        if (!title || !name || !author || !functionContractAddress || !shortDescription || !longDescription || !usage || !creatorAddress) {
            toast.current.show({severity:'error', summary: 'Incomplete', detail:' Please fill in all the prompts', life: 3000});

        }else {
            toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
            market_card.push(
                {
                    image: "https://cdn.britannica.com/88/62088-004-8245C6C2/graph-curve-calculus-help-steps-x-shape.jpg?w=400&h=300&c=crop",
                    title: title,
                    author: author,
                    long_details: longDescription,
                    short_details: shortDescription,
                    usage: usage,
            
                },
            )

            const db_values = {
                id: `${arrayIdIndex.length + 1}`,
                title: title,
                author: author,
                short_details: shortDescription,
                long_details: longDescription,
                usage: usage,
                functionAddress: functionContractAddress,
                creatorAddress: creatorAddress.toLocaleLowerCase(),
            }

            service.createProject(db_values);
        }
    }

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-code" aria-label="Code"></button>
            </span>
        );
    };

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
    }

    const header = renderHeader();



  return (
    <div>
        <Toast ref={toast} />
        <div style={{"height":"20px"}}></div>
        <div className="card flex align-items-center justify-content-center">
            <Card title="List Your Shout Out Token"  style={{width:"50%"}}>

                { section === 0 && 
                (<div>
                    <label className="block text-900 font-medium mb-2">Function name</label>
                    <InputText placeholder='Title' className="w-full mb-3" onChange={(e)=> {setTitle(e.target.value)}}/>

                    <label className="block text-900 font-medium mb-2">Name</label>
                    <InputText placeholder='Name' className="w-full mb-3" onChange={(e)=> {setName(e.target.value)}}/>

                    <label className="block text-900 font-medium mb-2">Author</label>
                    <InputText placeholder='Author' className="w-full mb-3" onChange={(e)=> {setAuthor(e.target.value)}}/>
                </div>) }

                { section ===1 && (
                    <div>

                        <label className="block text-900 font-medium mb-2">Short description</label>
                        <InputTextarea placeholder='Short details' className="w-full mb-3"  onChange={(e)=> {setShortDescription(e.target.value)}}/>

                        <label className="block text-900 font-medium mb-2">long description</label>
                        <InputTextarea placeholder='long details' className="w-full mb-3" onChange={(e)=> {setLongDescription(e.target.value)}}/>

                        <label className="block text-900 font-medium mb-2">Function contract address</label>
                        <InputText placeholder='Contract Address' className="w-full mb-3" onChange={(e)=> {seFunctionContractAddress(e.target.value)}}/>

                        <label  className="block text-900 font-medium mb-2">Function creator contract address</label>
                        <InputText placeholder='Creator Address' className="w-full mb-3" onChange={(e)=> {setCreatoAddress(e.target.value)}}/>

                        <div className="h-1rem"></div>
                        
                    </div>
                )}

                { section === 2 && (
                    <div>
                        <label className="block text-900 font-medium mb-2">Usage</label>
                        {/* <Editor placeholder="Put in a little code snippet to show the usage" value={usage} onTextChange={(e) => setUsage(e.textValue)} headerTemplate={header} style={{ height: '320px' }} /> */}
                        <Divider/>

                        <Button label="Submit" severity="primary" className="w-full" onClick={submissionButtonEventHandling} />

                    </div>
                )}

                    {section === 0 && (

                        <Button label="Next" severity="primary" className="w-full" onClick={nextSection} text icon='pi pi-arrow-circle-right'/>
                    )}
                    {section === 1 && (
                        <div className="flex align-items-center justify-content-center gap-5">
                            
                            <Button label="prevoiuse" severity="primary" onClick={()=>setSection(section -1)} text icon='pi pi-arrow-circle-left'/>
                            <Button label="Next" severity="primary" onClick={nextSection} text icon='pi pi-arrow-circle-right'/>
                        </div>
                    )}
                    {section === 2 && (
                        <div className="flex align-items-center justify-content-center gap-5">
                            <Button label="prevoiuse" severity="primary" onClick={()=>setSection(section -1)} text icon='pi pi-arrow-circle-left'/>
                            <Button label="go back" severity="primary"  onClick={()=> setSection(0)} text icon='pi pi-spinner'/>
                        </div>
                        
                    )}
  
                
                    
            </Card>
        </div>
    </div>
  )
}

export default ListFunctions

