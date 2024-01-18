import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import { Timeline } from 'primereact/timeline';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';

import './static/HomePage.css';
import celeb from './assets/Absolute_Reality_v16_Create_an_image_of_a_celebrity_giving_a_s_1.jpg'

const HomePage = () => {
    const navigate = useNavigate();

    const events = [
        { status: 'create profile', date: '15/10/2020 10:30', icon: 'pi pi-user', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'generate smart wallet', date: '15/10/2020 14:00', icon: 'pi pi-cog pi-spin', color: '#673AB7' },
        { status: 'beneficiary details', date: '15/10/2020 16:15', icon: 'pi pi-money-bill', color: '#FF9800' },
        { status: 'setup stream payment', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
        { status: 'move assets and relax', date: '16/10/2020 10:00', icon: 'pi pi-send', color: '#00BCD4' } // Change color here
    ];
    const customizedMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

  return (
    <div>
        <div >
            <div className="flex flex-column">
            <div className='background-image' style={{fontFamily: "Silkscreen, serif"}} >
                    <img src={'https://cdn.leonardo.ai/users/c542c8fd-7058-45bb-b6e0-61ab8db6c01a/generations/6198ac91-d5ef-499f-99bc-2e190b9711e1/Leonardo_Diffusion_XL_create_an_image_for_a_decentralised_news_0.jpg'} alt='' className='BackGround-image'/>
                </div>
                <div className='text-div'>

                    <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                        <span className="block text-6xl font-bold mb-1">Create and list cross-chain</span>
                    </div>

                    <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                        <p className="text-6xl text-primary font-bold mb-3">Tokenised News articles</p>
                    </div>
                    <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                        <div className="mt-0 mb-4 text-700 line-height-3 text-help-700 font-bold mb-3">list your articles and let GuardianQuill do the rest </div>
                    </div>
                    <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                        <Button label="Launch App" type="button" className="mr-3 p-button-raised" onClick={()=> navigate('/view-functions-cards')}/>
                    </div>
                </div>

            </div>

            <div className="">
                {/* <Lottie animationData={animationData} style={{zIndex:"-1"}}/> */}
            </div>
 
        </div>
    

    </div>
  )
}

export default HomePage