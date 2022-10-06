import client, {Channel, Connection, ConsumeMessage} from "amqplib";
import {load as loadYaml} from "js-yaml"
import * as fs from "fs";

const NAME_QUEUE: string = "demoQueue";

class UtilityRabbitMQ {
    private readonly _config: any;
    private _connection: Connection | undefined;
    private _chanel: Channel | undefined;
    private _consumedMessage: {[key: string]: string[]} = {
        [NAME_QUEUE]: []
    };

    constructor({consume}: {consume: boolean}) {
        try {
            this._config = loadYaml(fs.readFileSync(__dirname + '/initial.yaml', 'utf8'));
            this.initMQ({consume})
                .then(console.log).catch(console.error)
        } catch (err) {
            console.error(err)
            throw Error
        }
    }

    async initMQ({consume}: {consume: boolean}): Promise<{[key: string]: any}> {
        try {
            await this.connect();
            await this.createChanel();
            await this.assertQueue(NAME_QUEUE);

            if( consume )
                await this.consumeChanel(NAME_QUEUE);

            return Promise.resolve({status: true, queue: NAME_QUEUE});

        } catch (error: any) {
            return Promise.reject({status: false, error})
        }
    }

    async connect() {
        const {user, password, port, host} = this._config;
        this._connection =
            await client.connect(`amqp://${user}:${password}@${host}:${port}`);
    }

    async createChanel() {
        if ( this._connection )
            this._chanel = await this._connection.createChannel();
        else
            throw Error('Connection is not correct!')
    }

    async assertQueue(queue: string) {
        if ( this._chanel )
            await this._chanel.assertQueue(queue)
        else
            throw Error('Chanel is not correct!')
    }

    async sendToQueue(queue: string, message: Buffer) {
        if ( this._chanel )
            this._chanel.sendToQueue(queue, message);
        else
            throw Error('Chanel is not correct!')
    }

    async consumeChanel(queue: string) {
        if( this._chanel ) {
            await this._chanel.consume(queue, (message: ConsumeMessage | null) => {
                this._consumedMessage[queue].push((message as ConsumeMessage).content.toString());
                (this._chanel as Channel).ack(message as ConsumeMessage);
            });
        }
        else
            throw Error('Chanel is not correct!')
    }

    getConsumeMessages(queue: string): any[] {
        const data = this._consumedMessage[queue];
        this.clearReceivedConsumeMessages(queue);
        return data;
    }

    async closeChannel() {
        await this._chanel?.close()
    }

    private clearReceivedConsumeMessages(queue: string) {
        this._consumedMessage[queue] = [];
    }

    /*private static consumer(channel: Channel): any {
        return (message: ConsumeMessage | null): any => {
            if(message) {
                channel.ack(message);
            }
        }
    }*/
}

export default UtilityRabbitMQ;