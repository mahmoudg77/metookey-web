import {enableProdMode} from '@angular/core';
import {environment} from 'environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MetookeyAppModule} from 'app/app.module';
platformBrowserDynamic().bootstrapModule(MetookeyAppModule);



