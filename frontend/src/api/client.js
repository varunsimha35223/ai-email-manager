import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: BASE_URL })

export const getAuthUrl = (provider) =>
  api.get(`/auth/${provider}`).then((r) => r.data.url)

export const getEmails = (sessionId, provider) =>
  api.get('/emails', { params: { session_id: sessionId, provider } }).then((r) => r.data.emails)

export const getSummary = (sessionId) =>
  api.get('/emails/summary', { params: { session_id: sessionId } }).then((r) => r.data.summary)
