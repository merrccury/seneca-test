import Seneca from 'seneca';

const seneca = Seneca();
const client = seneca.client({
    host: "dc_server2",
    port: 3002
});

seneca.add({role: "service1", type: "message"}, function (msg, reply) {
    reply(null, {msg: "Hello from service1"});
    setTimeout(() => {
        client.act({role: "service2", type: "message"}, function (error, msg) {
            console.log("--------------------->")
            console.log("server 2 return result")
            console.log("--------------------->")
            if (error) return console.log(error);
            console.log(msg);
        })
    }, 3000);
});

seneca.add({role: "service1", type: "check"}, function (msg, reply) {
    reply(null, {msg: "service check 1"});
});


seneca.listen({
    host: "dc_server1",
    port: 3001
});

/*
setTimeout(() => {
    console.log('timerrrrr');
    client.act({role: "service2", type: "message"}, function (error, msg) {
        if (error) return console.log(error);
        console.log(msg);
    })
}, 10000);*/
