const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/area', (req, res) => {

    const { shape, dimensions } = req.body;

    if (!shape || !dimensions || typeof dimensions !== "object") {
        return res.status(400).json({
            message: "Please provide valid input"
        });
    }

    if (shape === "circle") {

        if (typeof dimensions.radius !== "number" || dimensions.radius <= 0) {
            return res.status(400).json({
                message: "Please provide valid input"
            });
        }

        const cirArea = Math.PI * dimensions.radius ** 2;

        return res.status(200).json({
            cirArea
        });
    }

    if (shape === "rectangle") {

        if (
            typeof dimensions.length !== "number" ||
            dimensions.length <= 0 ||
            typeof dimensions.width !== "number" ||
            dimensions.width <= 0
        ) {
            return res.status(400).json({
                message: "Please provide valid input"
            });
        }

        const recArea = dimensions.length * dimensions.width;

        return res.status(200).json({
            recArea
        });
    }

    if (shape === "square") {

        if (typeof dimensions.side !== "number" || dimensions.side <= 0) {
            return res.status(400).json({
                message: "Please provide valid input"
            });
        }

        const sqArea = dimensions.side ** 2;

        return res.status(200).json({
            sqArea
        });
    }

    return res.status(400).json({
        message: "Please provide valid input"
    });
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});