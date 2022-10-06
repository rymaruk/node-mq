import express, { Request, Response } from "express"
import UtilityRabbitMQ from "app_utility";

const app = express();
const utilityRabbitMQ = new UtilityRabbitMQ({consume: false});

// parse the request body
app.use(express.json())

// port where the service will run
const PORT = 9005

app.post('/message', async (req: Request, res: Response) => {
    const data = req.body

    // send a message to all the services connected to 'order' queue, add the date to differentiate between them
    await utilityRabbitMQ.sendToQueue(
        'demoQueue',
        Buffer.from(
            JSON.stringify({
                ...data,
                date: new Date(),
            }),
        ),
    )

    res.send('Message submitted');
})


app.get('*', (req: Request, res: Response) => {
    res.status(404).send('Not found')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})