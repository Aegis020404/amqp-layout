let amqp = require('amqplib/callback_api')

amqp.connect((e1, connection) => {
    if(e1) throw e1
    connection.createChannel((e2, channel) => {
        if(e2) throw e2
        let exchange = 'topic_logs';

    })
})