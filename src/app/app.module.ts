import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BootstrapConfig } from './app.config';
import { EnvironmentService } from './services/environment/environment.service';
import { LoggingService } from './services/monitoring/monitoring.service'

export function initAuth(config: BootstrapConfig,  envService:EnvironmentService) {
  const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: config.insights.instrumentationKey,
        enableAutoRouteTracking: environment.production // option to log all route changes
    }
  });
  appInsights.loadAppInsights()
  appInsights.trackPageView();
  envService.setEnvironment(config)
  EnvironmentService.monitor = appInsights;
  return () => {}
  
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: initAuth, 
      deps: [ BootstrapConfig, EnvironmentService ],
      multi: true,
    },

    EnvironmentService,
    LoggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
