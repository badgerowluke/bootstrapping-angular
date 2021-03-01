import { Injectable } from "@angular/core";

@Injectable()
export class BootstrapConfig {
  insights:Insights;
  backend:Backend;

}
class Insights {
  instrumentationKey:string
}
class Backend {
  apiUrl:string;
}