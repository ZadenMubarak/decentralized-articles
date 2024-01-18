import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import Blockies from 'react-blockies'; 
import { market_card } from '../models/market_card_model';
import { Badge } from 'primereact/badge';

import { AppStateService } from '../Appstate-sevice/AppState.service';
import { articleInfo } from '../models/articleInfoModel';

const ChipList = ({ itemsArray }) => {
  const navigate = useNavigate();

  if (itemsArray.length >= 3) {
    // Show the first three chips
    const chips = itemsArray.slice(0, 3).map((item, index) => (
      <Chip
        key={index}
        label={item.title}
        clickable
        onClick={() => {
          navigate('/view-functions-fully', { state: { ...item } });
        }}
        style={{ cursor: 'pointer' }}
      />
    ));

    return <div className="align-items-center hidden lg:flex flex flex-wrap gap-2">{chips}</div>;
  } else if (itemsArray.length === 1) {
    // Show a single chip for less than three items
    return (
      <Chip
        label={itemsArray[0].title}
        clickable
        onClick={() => {
          navigate('/view-functions-fully', { state: { ...itemsArray[0] } });
        }}
      />
    );
  } else {
    // No chips to display
    return null;
  }
};

const ViewCards = () => {
  const service = new AppStateService();
  service.getItemsFromRecord();
  service.getSubScribers();
  const navigate = useNavigate();

  const itemsArray = service.polybaseResponse;
  const articleArray = articleInfo;
  console.log('polypase response', itemsArray);

  return (
    <div className="p-grid p-justify-center">
      <div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap cursor-pointer">
        <div className="font-bold mr-8">🔥 Popular tokens !</div>
        <div className="align-items-center hidden lg:flex flex flex-wrap gap-2">
          <ChipList itemsArray={itemsArray} />
        </div>
      </div>
      <div style={{ height: '30px' }}></div>
      <div class="pl-7 border-round">
        <div className="pl-12 pt-6 text-3xl font-medium text-900 mb-3">Available functions <Badge  value={itemsArray.length}/></div>
    </div>

      <div className="flex flex-column">
        <div className="flex align-items-center justify-content-center h-4rem  font-bold border-round m-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Search" />
          </span>
        </div>
      </div>

      <div style={{ height: '20px' }}></div>

      <div className="flex justify-content-center flex-wrap gap-6">

        {articleArray.map((items, index) => (
                    <React.Fragment key={index}>
                    <Card className="w-20rem">
                      <Blockies scale={8} spotColor='#000' color='#dfe' seed={items.articleTile} size={36} />
                      <Divider />
        
                      <span className="block text-2xl font-bold mb-1">{items.articleTile}</span>
                      <Divider />
        
                      <div>writen by: {items.articleAuthor}</div>
                      
                      <Divider />
                      <Button
                        style={{ width: '100%' }}
                        label="read article"
                        severity="primary"
                        size="medium"
                        onClick={() => {
                          navigate('/view-functions-fully', { state: { ...items } });
                        }}
                      />
                      <div style={{ height: '30px' }}></div>
                    </Card>
                  </React.Fragment>
        ))}

        <Divider />
      </div>
    </div>
  );
};

export default ViewCards;
