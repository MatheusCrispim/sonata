import { getToken } from "../../utils/user.utils";

const BASE_PATH = 'https://app.sisalfa.dcx.ufpb.br/v1/api'

export class Service{

    constructor(){
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': getToken(),
        });

        this.data = {};
    }

    //get request
    get = async (endpoint) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'GET',
            headers: this.header,
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                    .then( result => { this.data = result});
    
        return {'status':statusCode, 'data':this.data};
    };

    
    //Post requestdata
    post = async (endpoint, value) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(value),
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                        .then( result => { this.data = result});

        return {'status':statusCode, 'data':this.data};
    }; 
    

    //Put request
    update = async (endpoint, value) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'PUT',
            headers: this.header,
            body: JSON.stringify(value),
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                        .then( result => { this.data = result});

        return {'status':statusCode, 'data':this.data};
    };


    //Delete request
    del = async (endpoint) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'DELETE',
            headers: this.header,
        });

        let statusCode = await rawResponse.status;

        return {'status':statusCode};
    };

}
