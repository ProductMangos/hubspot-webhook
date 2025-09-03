import express from "express";
import appInsights from "applicationinsights";

const app = express();
const port = process.env.PORT || 8080;

// 🔹 Initialize Application Insights
appInsights.setup("InstrumentationKey=ad86afea-fbb8-4c75-bf69-8913f98c1bec;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=383a0bb9-b286-45c9-99c2-cd86155f52bd")
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true)
    .start();

const telemetryClient = appInsights.defaultClient;

app.use(express.json());

app.post("/hubspot/webhook", (req, res) => {
    const events = req.body;

  console.log(events);

    // 🔹 Log to Azure Application Insights
    telemetryClient.trackTrace({
        message: "Webhook received",
        properties: events
    });

    // Or log as event
    telemetryClient.trackEvent({
        name: "HubSpotWebhook",
        properties: events
    });

    res.json({ events });
});

app.listen(port, () => {
    telemetryClient.trackTrace({ message: `Server running on http://localhost:${port}` });
    console.log(`Server running on http://localhost:${port}`);
});
