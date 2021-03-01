# NgBootstraping

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

The intent of this repository is to demonstrate the injection of configuration at startup/bootstrapping of the angular process (main.ts).

The consumer of the injected configuration in this instance is a monitoring service that "is connected" to Application Insights (Microsoft Azure offering). 


## creating configuration

Ideally, you would not/should not/don't have the instrumentation key for your production instance of App Insights at development time, to have that value provided through your CI/CD you would do something along the lines of the script below, lifted from an Azure Pipelines yaml file, where `$(variable)` are global environment variables injected directly from Azure Pipelines and `${{ parameter.variable }}` are pipeline template variables in a multi-module yaml pipeline.


```yaml

- pwsh: |
    $json = @"
    {
      "auth": {
        "domain": "",
        "clientId": ""
      },
      "insights": {
        "instrumentationKey": ""
      },
      "backend": {
        "apiUrl": "<<your backend server>>",
        "subscriptionKey":""
      }
    }
    "@
    Write-Output $json
    $workup = $json | ConvertFrom-Json
    $workup.auth.domain = '$(auth-domain)'
    $workup.auth.clientId = '$(auth-clientId)'
    $workup.insights.instrumentationKey = '${{ parameters.instrumentationKey }}'
    $workup.backend.subscriptionKey = "${{ parameters.subkey }}"
    New-Item -ItemType directory -Path $(Pipeline.Workspace)/${{ parameters.artifact }}/dist/assets/config
    $workup | ConvertTo-Json | Out-File '$(Pipeline.Workspace)/${{ parameters.artifact }}/dist/assets/config/config.json'

```

The above script creates a new config.json object and writes it into the assets folder.  From there it is simply a matter of completing your deployment by copying the dist folder of your angular application to the location where your SPA will be served.