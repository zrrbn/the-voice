import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema(
    {
        songName: {
            type: String,
            required: true
        },
        performDate: {
            type: Date,
            required: false,
            default: Date.now
        },
        score: {
            type: Number,
            required: false,
            default: 0
        }
    }
)
const Song = mongoose.model('song', SongSchema)
export default Song