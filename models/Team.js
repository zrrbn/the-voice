import mongoose from 'mongoose';
const TeamSchema = new mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true
        },
        condidateIds: {
            type: Array,
            required: false
        }
    }
)
const Team = mongoose.model('team', TeamSchema)
export default Team