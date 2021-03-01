import { Injectable } from '@angular/core';
import { environment as env} from '../../../environments/environment'
import { BootstrapConfig } from '../../app.config';
import { IAppMonitor } from '../monitoring/app-monitor'



@Injectable()
export class EnvironmentService 
{
    static monitor: IAppMonitor;
    private dynamicEnv: any;
    constructor(private config: BootstrapConfig) { }
    get environment() { return this.dynamicEnv }

    get apiUrl() {
        if(env.production) {
            return this.dynamicEnv.backend.apiUrl;
        }
        return window.location.origin;
    }

    setEnvironment(env: any) {
        this.dynamicEnv = this.config;
    }
}