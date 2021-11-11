import Seneca from 'seneca';

const seneca = Seneca();
const client = seneca.client({
    host: "dc_server1",
    port: 3001
});

seneca.add({role: "service2", type: "message"}, function (msg, reply) {
    reply(null, {msg: "Hello from service2"});
    setTimeout(() => {
        client.act({role: "service1", type: "message"}, function (error, msg) {
            console.log("--------------------->")
            console.log("server 2 return result")
            console.log("--------------------->")
            if (error) return console.log(error);
            console.log(msg);
        })
    }, 3000);
});

seneca.add({role: "service2", type: "check"}, function (msg, reply) {
    reply(null, {msg: "service check 2"});
});

seneca.listen({
    host: "dc_server2",
    port: 3002
});