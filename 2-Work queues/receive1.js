var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) throw error0;

    connection.createChannel(function(error1, channel) {
        if (error1) throw error1;

        let queue = 'task_queue2';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1)
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            let secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());

            setTimeout(() => {
                console.log([`[x] Done ${msg.content.toString()}`])
            }, secs * 1000)
        }, {
            noAck: true
        });
    });


});