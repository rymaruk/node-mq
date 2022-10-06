import express, { Request, Response } from "express"
import isEmpty from "lodash/isEmpty";
import UtilityRabbitMQ from "app_utility";

const app = express();
const utilityRabbitMQ = new UtilityRabbitMQ({consume: true});

// parse the request body
app.use(express.json())

// port where the service will run
const PORT = 9006

app.get('/consumer', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    const consumedMsg = utilityRabbitMQ.getConsumeMessages('demoQueue');
    if( !isEmpty(consumedMsg) ) {
        res.send(JSON.stringify({"data": consumedMsg}));
    }
    else {
        res.send(JSON.stringify({"data": "Queue is empty"}));
    }

})


app.get('*', (req: Request, res: Response) => {
    res.status(404).send('Not found')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})