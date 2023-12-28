import { ethers } from 'ethers';
import { Polybase } from "@polybase/client";
import { Auth } from '@polybase/auth'

export class AppStateService {

    constructor() {
        if (typeof AppStateService.instance === 'object') {
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;

        console.log("instance created");

        this.provider = new ethers.BrowserProvider(window.ethereum);
        // this.signer = this.provider.getSigner();
        this.walletAddress = "";
        this.connected = false;
        this.userAddress = []

        const db = new Polybase({
            defaultNamespace: "pk/0xbd242ce427525d219c617b9856f0052b52334321d47d1793a7653cab5b2dac45792735a33e4b2789cbf8063555816d8a37226f8b393645c78244c175a010fbed/Rapid.Oracle",
          });
        
          const subscriberDB = new Polybase({
            defaultNamespace: "pk/0xbd242ce427525d219c617b9856f0052b52334321d47d1793a7653cab5b2dac45792735a33e4b2789cbf8063555816d8a37226f8b393645c78244c175a010fbed/subscriptionHandler",
          });
        this.nextPolybaseRecordID = null;
        this.collectionReference = db.collection('RapidOracleDb');

        // this.contractPendingProjects = [];
        this.liveFunctions = [];
        this.polybaseResponse = [];
        this.subscribersResponse = [];
        this.cretaedFunctionsresponse = [];


        const auth = new Auth()
        db.signer(async (data) => {
            return {
                h: 'eth-personal-sign',
                sig: await auth.ethPersonalSign(data)
        }});
        this.collectionReference = db.collection('RapidOracleDb');

        subscriberDB.signer(async (data) => {
            return {
                h: 'eth-personal-sign',
                sig: await auth.ethPersonalSign(data)
            }
        })
        this.subscriberReferance = subscriberDB.collection('SubscriptionHandler');

    }

    generatePolybaseID = () => {
        this.nextPolybaseRecordID = this.polybaseResponse.length + 1;
        return this.nextPolybaseRecordID.toString();
    }

    async getSubScribers() {
        try {
            console.log('from get: ', this.walletAddress);
            const data = await this.subscriberReferance.where("SubscriberAddress", "==", this.walletAddress.toLocaleLowerCase()).get();
            const array = data.data;
            let temp = [];
    
            array.forEach(element => {
                temp.push(element.data);
            });
    
            this.subscribersResponse = temp;
            console.log(this.subscribersResponse);
            return temp;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMyListedFunctions() {
        try {
            console.log('from get: ', this.walletAddress);
            const data = await this.collectionReference.where("creatorAddress", "==", this.walletAddress).get();
            const array = data.data;
            let temp = [];
    
            array.forEach(element => {
                temp.push(element.data);
            });
    
            this.cretaedFunctionsresponse = temp;
            console.log('listed', temp);
            return temp;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getItemsFromRecord() {
        // this.subscriberReferance.record("1").call("del");
        // this.collectionReference.record("2").call("del");
        // this.collectionReference.record("3").call("del");
        // this.collectionReference.record("4").call("del");
        // this.collectionReference.record("5").call("del");

        await this.collectionReference.get().then((data) => {
            const array = data.data;  // Check if data contains an array property
            let temp = [];
    
            array.forEach(element => {
                temp.push(element.data);
            });
    
            console.log(temp[0].author);
            console.log("length: ", temp.length);
            this.polybaseResponse = temp;
            return temp;
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
    

    async createProject(projectObject){
        let id = this.generatePolybaseID()
        await this.collectionReference.create([
            id,
            projectObject.title,
            projectObject.author,
            projectObject.short_details,
            projectObject.long_details,
            projectObject.usage,
            projectObject.functionAddress,
            projectObject.creatorAddress
        ])
    }

    async createSubscriber(projectObject){
        let id = this.subscribersResponse.length + 1;
        await this.subscriberReferance.create([
            id.toString(),
            projectObject.FunctionAddress,
            projectObject.SubscriberAddress,
            projectObject.FunctionName,
        ]);
    }

    async getUseAddress() {
        const records = await this.collectionReference.where('creatorAddress').get().then((data, cursor) =>{
            let array = data.data;
            let temp = [] ;
            array.forEach(element => {
                temp.push(element.data)
                
            });
            this.userAddress = temp;

        })
      

        console.log('data & cursor',this.userAddress);
    }

    connectToMetaMask = async ()=> {
        try {
            if (typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
                const accounts = window.ethereum.request({method: "eth_requestAccounts"}).then((data) => {
                    console.log(data[0]);
                    this.walletAddress = data[0];
                    this.connected = true
                    console.log('wallet address from singleton: ', this.walletAddress);
                }).catch((error) => {
                    console.log('error in singleton : ', error);
                })   
            }
        } catch (error) {
            console.log("refused the request to sign");
        }
      }
}
