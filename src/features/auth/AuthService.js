import api from '../../services/apiConnector';

export const fetchLatestResumeFileName=async(token)=>{
  const res = await api.get('/cv/latest-filename', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data.fileName
}