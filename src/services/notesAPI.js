import axios from 'axios'

const API_URL = "https://idratomrqkimlpinqlrt.supabase.co/rest/v1/Notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcmF0b21ycWtpbWxwaW5xbHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MjI1MzIsImV4cCI6MjA5NzI5ODUzMn0.bPdhTIlAg4EvJJdsID-EVdCqp2dbyE28ywm8fbXxgtI"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    
    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
    
}