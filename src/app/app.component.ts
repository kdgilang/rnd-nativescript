import { Component } from '@angular/core';
import { isIOS } from 'platform';
import { topmost } from 'tns-core-modules/ui/frame';
import { alert } from 'ui/dialogs';
import * as application from 'application';
import * as connectivityModule from 'tns-core-modules/connectivity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor() {
		const myConnectionType = connectivityModule.getConnectionType();
		let isOnline = true;

		switch (myConnectionType) {
		    case connectivityModule.connectionType.none:
		        // Denotes no Internet connection.
		        isOnline = false;
		        break;
		    case connectivityModule.connectionType.wifi:
		        // Denotes a WiFi connection.
		        console.log("WiFi connection");
		        break;
		    case connectivityModule.connectionType.mobile:
		        // Denotes a mobile connection, i.e. cellular network or WAN.
		        console.log("Mobile connection");
		        break;
		    case connectivityModule.connectionType.ethernet:
		        // Denotes a ethernet connection.
		        console.log("Ethernet connection");
		        break;
		    default:
		    	isOnline = false;
		        break;
		}
		
		setTimeout(() => {
			if(!isOnline) {
				alert({
				    title: "Miskin!",
				    message: "Your are offline.",
				    okButtonText: "OK",
				    cancelable: false // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
				}).then(() => {
					if(isIOS) {
				    	// exit(0);
					} else {
						application.android.foregroundActivity.finish();
					}
				});
			}
		}, 500 );
	}
}
