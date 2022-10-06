## ✅ RabbitMQ + NodeJS (TypeScript)


```
Asynchronous communication is achieved by message brokers which would be 
handling messages between services. RabbitMQ is a message broker that 
will be receiving, storing & delivering messages between consumers and 
publishers. 

RabbitMQ uses AMQP (Advanced Message Queuing Protocol) 
to standatizes messaging by defining producers, brokers and consumers. 

However RabbitMQ supports other protocols such as MQTT, HTTP but for 
this tutorial it will covert AMQP usage with Nodejs.
```

### RabbitMQ Architecture

#### ➡️ Connection
```
→ Bidirectional stateful TCP connection is 
created to connect publishers and consumers with RabbitMQ service.
```

#### ➡️ Channel
```
→ A logical connection within TCP connection, to separate multiple 
consumers within same physical consumer sharing same TCP connection 
providing Multiplexing.
```

#### ➡️ Exchange
```
→ Responsible for sending message to required queue depending on 
binding key between exchange and queue. 
There are different types of exchanges discussed below.
```

#### ➡️ Queue
```
→ Responsible for storing messages that are to be consumed, and 
queues are connected to exchanges via binding key. 
Thereby depending on type of exchange and routing key of 
message, it will be routed to preferred queue by exchanges.

```

