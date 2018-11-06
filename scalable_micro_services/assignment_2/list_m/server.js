let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const SERVER_ADDRESS = "localhost:5001";

// Load protobuf
let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

let todoList = [];

// Receive message from client joining
function join(data, callback) {
  users.push(data);
  notiftListUpdate({ user: "Server", text: "new user joined ..." });
}

// Receive message from client
function add(data, callback) {
  notiftListUpdate(data.request);
}

// Send message to all connected clients
function notiftListUpdate(message) {
  users.forEach(user => {
    user.write(message);
  });
}

// Define server with the methods and start it
server.addService(proto.example.Chat.service, { join: join, send: send });

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

server.start();
