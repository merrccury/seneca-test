import Seneca from 'seneca';

const seneca = Seneca();


seneca.add({role: "service2", type: "message"}, function (msg, reply) {
    reply(null, {msg: "Hello from service2"});
    setTimeout(() => {
        seneca.client(3001).act({role: "service1", type: "message"}, function (error, msg) {
            if (error) return console.log(error);
            console.log(msg);
        })
    }, 3000);

});

seneca.listen({port: 3002});