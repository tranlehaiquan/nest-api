const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function testSimpleUpload() {
  console.log('🧪 Testing Simple Upload...\n');

  try {
    // Test simple upload
    console.log('1️⃣ Testing Simple Upload...');
    const response = await axios.post(`${API_BASE_URL}/image-test/test-simple`);
    console.log('✅ Simple Upload Response:', response.data);
    console.log('');

    // Test health check
    console.log('2️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/image-test/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test list images
    console.log('3️⃣ Testing List Images...');
    const listResponse = await axios.get(`${API_BASE_URL}/image-test/images`);
    console.log('✅ List Images:', listResponse.data);
    console.log('');

    console.log('🎉 Simple test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run the test
testSimpleUpload();
