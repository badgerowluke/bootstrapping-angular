import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { SeverityLevel } from './severity-level.model';


// API Documentation
// https://github.com/microsoft/applicationinsights-js
@Injectable()
export class LoggingService {

    logPageView(name?: string, url?: string) {
        EnvironmentService.monitor.trackPageView({name: name, uri: url})
    }

    // Log non-exception type errors, e.g. invalid API request
    logError(error: any, severityLevel?: SeverityLevel) {
        this.sendToConsole(error, severityLevel)

    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        EnvironmentService.monitor.trackEvent({name: name}, properties)

    }

    logMetric(name: string, average: number, properties?: { [key: string]: any }) {
        EnvironmentService.monitor.trackMetric({name: name, average:average}, properties)

    }

    logException(exception: Error, severityLevel?: SeverityLevel) {
        EnvironmentService.monitor.trackException({exception:exception, severityLevel: severityLevel})

    }

    logTrace(message: string, properties?: { [key: string]: any }) {
        EnvironmentService.monitor.trackTrace({ message: message}, properties);

    }

    private sendToConsole(error: any, severityLevel: SeverityLevel = SeverityLevel.Error) {

        switch (severityLevel) {
            case SeverityLevel.Critical:
            case SeverityLevel.Error:
                (<any>console).group('Demo Error:');
                console.error(error);
                if (error.message) {
                    console.error(error.message);
                }
                if (error.stack) {
                    console.error(error.stack);
                }
                (<any>console).groupEnd();
                break;
            case SeverityLevel.Warning:
                (<any>console).group('Demo Error:');
                console.warn(error);
                (<any>console).groupEnd();
                break;
            case SeverityLevel.Information:
                (<any>console).group('Demo Error:');
                console.log(error);
                (<any>console).groupEnd();
                break;
        }
    }
}