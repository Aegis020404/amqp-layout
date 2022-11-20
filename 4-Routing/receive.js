let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (e1, connection) => {
    if (e1) throw e1
    connection.createChannel((e2, channel) => {
        if (e2) throw e2
        let exchange = 'direct_logs'

        channel.assertExchange(exchange, 'direct', {
            durable: false
        })
        let arr = ['yellow','red','green']
        arr.forEach(queue => {
            channel.assertQueue(queue, {
                exclusive: true
            }, (e3, q) => {
                if (e3) throw e3
                console.log('[*] Waiting for logs. To exit precc CTRL + C fuckintosh+')

                arr.forEach((severity) => {
                    channel.bindQueue(q.queue, exchange, severity)
                })

                channel.consume(q.queue, msg => {
                    console.log("[Y] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                }, {
                    // noAck: true
                })
            })
        })
    })
})