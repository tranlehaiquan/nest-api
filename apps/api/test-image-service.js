const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_BASE_URL = 'http://localhost:3000';

async function testImageService() {
  console.log('🧪 Testing Image Service Integration...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/image-test/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Storage Info
    console.log('2️⃣ Testing Storage Info...');
    const storageResponse = await axios.get(
      `${API_BASE_URL}/image-test/storage-info`,
    );
    console.log('✅ Storage Info:', storageResponse.data);
    console.log('');

    // Test 3: List Images (should be empty initially)
    console.log('3️⃣ Testing List Images...');
    const listResponse = await axios.get(`${API_BASE_URL}/image-test/images`);
    console.log('✅ List Images:', listResponse.data);
    console.log('');

    // Test 4: Upload Test Image
    console.log('4️⃣ Testing Image Upload...');

    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
      0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0x00, 0x00,
      0x03, 0x01, 0x01, 0x00, 0x18, 0xdd, 0x8d, 0xb0, 0x00, 0x00, 0x00, 0x00,
      0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);

    const formData = new FormData();
    formData.append('file', testImageBuffer, {
      filename: 'test-image.png',
      contentType: 'image/png',
    });

    const uploadResponse = await axios.post(
      `${API_BASE_URL}/image-test/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    console.log('✅ Upload Response:', uploadResponse.data);
    console.log('');

    const uploadedImageId = uploadResponse.data.imageId;

    // Test 5: Get Image Info
    console.log('5️⃣ Testing Get Image...');
    const getImageResponse = await axios.get(
      `${API_BASE_URL}/image-test/image/${uploadedImageId}`,
    );
    console.log('✅ Get Image:', getImageResponse.data);
    console.log('');

    // Test 6: List Images Again (should now have one image)
    console.log('6️⃣ Testing List Images (after upload)...');
    const listAfterResponse = await axios.get(
      `${API_BASE_URL}/image-test/images`,
    );
    console.log('✅ List Images (after upload):', listAfterResponse.data);
    console.log('');

    // Test 7: Delete Image
    console.log('7️⃣ Testing Delete Image...');
    const deleteResponse = await axios.delete(
      `${API_BASE_URL}/image-test/image/${uploadedImageId}`,
    );
    console.log('✅ Delete Image:', deleteResponse.data);
    console.log('');

    // Test 8: List Images Again (should be empty)
    console.log('8️⃣ Testing List Images (after delete)...');
    const listAfterDeleteResponse = await axios.get(
      `${API_BASE_URL}/image-test/images`,
    );
    console.log('✅ List Images (after delete):', listAfterDeleteResponse.data);
    console.log('');

    console.log('🎉 All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run the test
testImageService();
