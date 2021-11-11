import Seneca from 'seneca';

const seneca = Seneca();


seneca.client({port: 3001}).act({role: "service1", type: "message"}, function (error, msg) {
    if (error) return console.log(error);
    console.log(msg);
})