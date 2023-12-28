import { BrowserRouter, Route, Routes} from 'react-router-dom'

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";            
import 'primeicons/primeicons.css';    


import Navbar from './components/Navbar_component'
import HomePage from './pages/Home_page'
import ViewCards from './pages/MarketPlace';
import ViewFullInfo from './pages/ViewShoutOutInfo';
import ListFunctions from './pages/ListShoutOut';
import DocumentationPage from './pages/DocumentationPage';
import TutorialPage from './pages/TutorialPage'
import ManageSubscriptions from './pages/ManageShoutOtsAndTokens';

import { AppStateService } from './Appstate-sevice/AppState.service';


function App() {

  const service = new AppStateService();

  service.getItemsFromRecord();
  service.getSubScribers();

  return(
    <>
    <BrowserRouter> 
      <Navbar/>
      <div style={{height:"16vh"}}></div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/view-functions-cards' element={<ViewCards />} />
        <Route path='/view-functions-fully' element={<ViewFullInfo />} />
        <Route path='/list-function' element={<ListFunctions/>} />
        <Route path='/documentation' element={<DocumentationPage/>} />
        <Route path='/tutorials' element={<TutorialPage/>} />
        <Route path='/manage-subscriptions' element={<ManageSubscriptions/>} />
      </Routes>
    </BrowserRouter>
    </> 

  )
}

export default App