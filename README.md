## RabbitMQ + NodeJS (TypeScript)
```
RabbitMQ communication happens via AMQP protocol, 
and for Nodejs there is amqplib npm package to interact with RabbitMQ.
```

### RabbitMQ Architecture
```
Connection → Bidirectional stateful TCP connection is 
created to connect publishers and consumers with RabbitMQ service.
```
```
Channel → A logical connection within TCP connection, to separate multiple 
consumers within same physical consumer sharing same TCP connection 
providing Multiplexing.
```
```
Exchange → Responsible for sending message to required queue depending on 
binding key between exchange and queue. 
There are different types of exchanges discussed below.
```
```
Queue → Responsible for storing messages that are to be consumed, and 
queues are connected to exchanges via binding key. 
Thereby depending on type of exchange and routing key of 
message, it will be routed to preferred queue by exchanges.

```

### A sample code snippet for testing:
```
    (async () => {
        const utilityRabbitMQ = new UtilityRabbitMQ();

        async function* asyncGenerator() {
            let i = 0;
            while (i < 10000) {
                yield i++;
            }
        }

        for await (const num of asyncGenerator()) {
            await utilityRabbitMQ.sendToQueue(NAME_QUEUE, Buffer.from(`My new message ${num}`));
        }

    })();

```