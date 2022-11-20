let amqp = require('amqplib/callback_api');



amqp.connect('amqp://localhost', (e1, connection) => {
    if(e1) throw e1
    connection.createChannel((e2, channel) => {
    if(e2) throw e2
        let exchange = 'direct_logs'
        let msg = 'Hello World!';
        let severity = 'info';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        })
        setInterval(() => {
            let rndm = ~~(Math.random() * 3)
            switch (rndm) {
                case 0: rndm = 'yellow'
                    break
                case 1: rndm = 'red'
                    break
                case 2: rndm = 'green'
                    break
            }
            channel.publish(exchange, rndm, Buffer.from(rndm.toString()))
            console.log(" [x] Sent %s: '%s'", severity, rndm);
        },0)
    })
})