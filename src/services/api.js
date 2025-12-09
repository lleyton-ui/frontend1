import axios from 'axios';

// CHANGE THIS URL based on your device
// Android Emulator: http://10.0.2.2:8000/api/
// iOS Simulator: http://localhost:8000/api/
// Physical Device: http://<YOUR_PC_IP>:8000/api/

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000//api', 
  timeout: 10000, // Important to catch connection timeouts
});

export default api;