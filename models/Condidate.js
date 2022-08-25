import mongoose from 'mongoose';
const CondidateSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        songIds:{
            type: Array,
            required: false
        }
    }
)
const Condidate = mongoose.model('condidate', CondidateSchema)
export default Condidate