import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictWineQuality = async (inputData) => {
  const res = await api.post('/predict', {
    input_data: inputData,
  });
  return res.data;
};