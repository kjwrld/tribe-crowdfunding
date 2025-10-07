require("dotenv").config();

// Test the API function directly
const handler = require("./api/create-checkout-session.js");

// Mock request/response objects
const mockReq = {
    method: "POST",
    headers: {
        origin: "http://localhost:3002",
    },
    body: {
        amount: 20,
        donationType: "one-time",
        description: "Test donation",
    },
};

const mockRes = {
    setHeader: () => {},
    status: (code) => ({
        json: (data) => console.log(`Status ${code}:`, data),
        end: () => console.log(`Status ${code}: ended`),
    }),
    json: (data) => console.log("Success:", data),
};

// console.log('Testing API function...');
handler(mockReq, mockRes).catch(console.error);
