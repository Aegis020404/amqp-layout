    var amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost',(err1,connection) => {
    if(err1) throw err1
    connection.createChannel((err2, channel) => {
    if(err2) throw err2
        console.log('work')
        let exchange = 'logs';
        let msg =  'Hello World!';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        setInterval(() => {

        channel.publish(exchange, '', Buffer.from(msg));
        },0)
        console.log(" [x] Sent %s", msg);
    })
})