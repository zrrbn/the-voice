import mongoose from 'mongoose';
const MentorSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        teamIds: {
            type: Array,
            required: false
        }
    }
)
const Mentor = mongoose.model('mentor', MentorSchema)
export default Mentor