let ampq = require('amqplib/callback_api')

ampq.connect('amqp://localhost', (e1, connection) => {
    if (e1) throw e1
    connection.createChannel((e2, channel) => {
        if (e2) throw e2
        let exchange = 'logs'

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        })
        channel.assertQueue('', {
            exclusive: true
        }, (e3, q) => {
            if (e3) throw e3
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');
            channel.consume(q.queue, (msg) => {
                if(msg.content)
                    console.log(" [x] %s", msg.content.toString());
            }, {
                noAck: true
            })
        })
    })
})