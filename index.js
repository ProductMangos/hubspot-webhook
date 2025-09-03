import express from "express";

const app = express();
app.use(express.json());

app.post("/hubspot/webhook", (req, res) => {
    const events = req.body;

    console.log("Webhook received:", events);

    // TODO: Handle events (example: update DB, trigger workflows, etc.)

    // Respond quickly (HubSpot requires < 5s response time)
    res.json({events: events});
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
