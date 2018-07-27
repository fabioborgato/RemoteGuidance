// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCy_-Cp1Km3LlEnt4LPOKVAk7hlN3zLwwo',
    authDomain: 'remoteguidance-f2edb.firebaseapp.com',
    databaseURL: 'https://remoteguidance-f2edb.firebaseio.com',
    projectId: 'remoteguidance-f2edb',
    storageBucket: 'gs://remoteguidance-f2edb.appspot.com',
    messagingSenderId: '532272414073'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
