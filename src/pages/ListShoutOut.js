import React, { useState, useRef } from "react";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import {Panel} from 'primereact/panel'
import {ScrollPanel} from 'primereact/scrollpanel'

import OpenAI from "openai";
import { articleInfo } from "../models/articleInfoModel";
import { AppStateService } from "../Appstate-sevice/AppState.service";

const openai = new OpenAI({apiKey:"your_api_key", dangerouslyAllowBrowser:true});
const service = new AppStateService();

const ListFunctions = () => {
    const [section, setSection] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cancontinue, setCanContinue] = useState(false)
    const toast = useRef(null);
    const [editorText, setEditorText] = useState('');
    const [headline , setHeadline] = useState('');
    const [author, setAuthor] = useState('');
    // const navigate = useNavigate()
    // const nextSection = () => {
    //     setSection(section + 1);
    // }
    const ConvertToSmartContract = async () => {

      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: `You are an experienced Article writer and journalist, with extensive experience of  writing articles and rewriting articles that have any  bias or any offensive content. Check the article below and edit it to make sure that there is no hate speech, offensive content and bias and edit the article. Here is the article: ${editorText}` }],
          model: "gpt-3.5-turbo",
          temperature: 0
        })
        localStorage.setItem("GeneratedContract", completion.choices[0].message.content)
        setLoading(false);
        console.log(completion.choices[0].message.content);
         localStorage.setItem("editedArticle", `${completion.choices[0].message.content}`) 
        
      } catch (error) {
        console.log('from convert', error);
        
      }

    };

    const submissionButtonEventHandling = () => {
      const  articleContent = localStorage.getItem("editedArticle");
        if (!headline || !author || !editorText) {
            toast.current.show({severity:'error', summary: 'Incomplete', detail:' Please fill in all the prompts', life: 3000});

        }else {
          toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
          const db_values = {articleTile:headline, articleAuthor: author, articleContent:articleContent} 
          articleInfo.push({articleTile:headline, articleAuthor: author, articleContent:articleContent})
           service.createProject(db_values);
        }
    }
      const footerContent = (
        <div>
          {
            !cancontinue ?(
              <Button label="Save" icon="pi pi-arrow-circle-right" onClick={() => { setCanContinue(true); setLoading(true) }} raised/>
            ):
          loading ? (
            <div className="p-d-flex p-ai-center p-jc-center">
              <i className="pi pi-spin pi-spinner text-blue-500" style={{ fontSize: '2rem', marginRight: '0.5rem' }}></i>
              <span>Your article is on the way...</span>
            </div>
          ) : !loading ? (
            <Button label="Continue" icon="pi pi-arrow-circle-right" onClick={() => {localStorage.setItem("Contract", `${editorText}`); setVisible(false); ;setSection(section+1) }} text raised autoFocus />
          ) :(
            <Button label="Continue" icon="pi pi-arrow-circle-right" onClick={() => {localStorage.setItem("Contract", `${editorText}`); setVisible(false); ;setSection(section+1) }} text raised autoFocus />
          )}
        </div>
      );

    const renderHeader = () => {
        return (
          <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
          </span>
        );
      };

      const reviewHeader = () => {
        return (
          <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
          </span>
        );
      };
      const header = renderHeader();
      const review = reviewHeader();

      const CheckEditorcontent = async (event) => {
        if (!editorText || !headline || !author){
            console.log("editor is not filled");
            toast.current.show({ severity: 'warn', summary: 'Field not filled in', detail: "please fill in the prompts." });
        }else {
            ConvertToSmartContract()
            setVisible(true)
            localStorage.setItem("Contract", `${editorText}`);       
            toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
            // localStorage.setItem("GeneratedContract", `${contractText}`)     
        }
      }
      
    return (
        <div>

          <div style={{height:"25px"}}> </div>
          <Toast ref={toast}></Toast>

          <Dialog header="Click continue to deploy your contract when the button is enabled" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            {/* dialog */}
            <pre>
              <Editor value={editorText} onTextChange={(e) => {setEditorText(e.textValue)}} headerTemplate={review} style={{ height: '320px' }}/>
            </pre>
          </Dialog>

          <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Enter your article</div>
                </div>

                
                  {section === 0 && (
                        <div>
                            <label className="block text-900 font-medium mb-2">title of your article</label>
                            <InputText placeholder='article title' className="w-full mb-3"  onChange={(e)=> {setHeadline(e.target.value)}}/>
                            <label className="block text-900 font-medium mb-2">name of author</label>
                            <InputText placeholder='author name' className="w-full mb-3"  onChange={(e)=> {setAuthor(e.target.value)}}/>
                            <div className="spacer" style={{height:"20px"}}></div>
                            <label className="block text-900 font-medium mb-2"> Enter article below</label>
                            <Editor value={editorText} onTextChange={(e) => { setEditorText(e.textValue) }} headerTemplate={header} style={{ height: '320px' }} />
                            <div className="spacer" style={{height:"20px"}}></div>
                            <Button label="Save and review" icon="pi pi-cloud-upload" className="w-full"  onClick={CheckEditorcontent}/>
                            {/* <Button label="Next" severity="primary" className="w-full" onClick={nextSection} text icon='pi pi-arrow-circle-right'/> */}
                        </div>

                    )}
                    {section === 1 && (
                        <div >
                           < div className="text-2xl text-primary font-bold mb-3">Article image generation still under construction</div>
                            <div className="flex align-items-center justify-content-center gap-5">
                                {/* <Card title={headline} footer={footer} header={cardHeader} className="md:w-25rem block">
                                    <p className="m-0">
                                        click open to read full article
                                    </p>
                                </Card> */}
                                <div className="card">
                                    <div className="border-round border-1 surface-border p-4 surface-card">
                                        <div className="flex mb-3">
                                            {/* <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton> */}
                                            <div>
                                                <Skeleton width="10rem" className="mb-2"></Skeleton>
                                                <Skeleton width="5rem" className="mb-2"></Skeleton>
                                                <Skeleton height=".5rem"></Skeleton>
                                            </div>
                                        </div>
                                        <Skeleton width="100%" height="150px"></Skeleton>
                                        <div className="flex justify-content-between mt-3">
                                           
                                        </div>
                                    </div>
                                    < div className="text-1xl text-primary-900 font-bold mb-3">
                                      Fully edited article
                                      <ul className="list-none p-0 m-0 flex-grow-1">
                                        <li className="flex align-items-center mb-3">
                                            <span>Article checked successfully </span>
                                            <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                        </li>
                       
                                    </ul>
                                    </div>
                                      <Panel header={`${headline}`} toggleable >
                                          <ScrollPanel pt={{barY:{className: "bg-primary"}}}  style={{ width: '100%', height: '200px' }} className="custombar1 ">
                                              {localStorage.getItem("editedArticle")}
                                          </ScrollPanel>
                                      </Panel>
                                    {/* <Editor readOnly value={localStorage.getItem("editedArticle")}/> */}
                                </div>
                            </div>


                            <div className="flex align-items-center gap-5">
                              <Button label="Publish article" severity="primary" className="w-full" onClick={submissionButtonEventHandling} />
                            </div>
                       </div>
                     )}
            </div>
        </div>
        </div>
      );
      
}

export default ListFunctions