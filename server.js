const dgram = require('dgram');

// Multicast address and port
const multicastAddress = '239.255.255.250';
const multicastPort = 1982;

// Create a UDP socket for receiving
const server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

// Set up an event listener for incoming messages
server.on('message', (msg, rinfo) => {
    console.log(new Date(), `Received advertisement from ${rinfo.address}:${rinfo.port}:`,  msg.toString());
    // Process the advertisement message as needed
});

// Bind the server to the multicast port and address
server.bind(multicastPort, () => {
    // Add the server to the multicast group
    server.addMembership(multicastAddress);
    console.log(`Server listening for advertisements on ${multicastAddress}:${multicastPort}`);
});

// Set up an event listener for errors
server.on('error', (err) => {
    console.error('Error:', err.message);
});

// Set up an event listener for the server close event
server.on('close', () => {
    console.log('Server closed');
});

// Handle SIGINT (Ctrl+C) to close the server gracefully
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server gracefully closed');
    });
});
