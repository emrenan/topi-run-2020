import { api, LightningElement } from 'lwc';

import searchAddress from '@salesforce/apex/SearchAddressCtrl.searchAddress';
 
export default class SearchZipcode extends LightningElement {

    @api
    zipCode;

    constructor() {
        super();
        console.log('SearchZipcode Run Constructor');
    }

    connectedCallback() {
        console.log('SearchZipcode Connected Callback');
    }

    renderedCallback() {
        console.log('SearchZipcode Rendered Callback');
    }

    handleBlur (event) {

        if (!event.target.value 
            || event.target.value == this.zipCode) return;
        
        let _zipCode = Object.assign(event.target.value.replace('-', ''));

        searchAddress({ zipCode : _zipCode }).then( response => {
            let address = response;
            this.publishAddressChanged(address);
        });
        console.log (' final do blur ');
    }


    publishAddressChanged(address) {

        let searchedAddressEvent = new CustomEvent('searchedaddress', { 
            detail : address
        });

        this.dispatchEvent(searchedAddressEvent);

    }

}