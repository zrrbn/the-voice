import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { PORT, mongoUri } from './config.js';
import cors from 'cors';
import morgan from 'morgan'
import adminRoutes from './routes/api/adminApi.js'
import mentorRoutes from './routes/api/mentorApi.js'
import teamRoutes from './routes/api/teamApi.js'
import condidateRoutes from './routes/api/condidateApi.js'
import songRoutes from './routes/api/songApi.js'

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("mongo connected"))
    .catch((err) => console.log(err))

app.use('/api/admins', adminRoutes)
app.use('/api/mentors', mentorRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/condidates', condidateRoutes)
app.use('/api/songs', songRoutes)

app.get('/', (req, res) => res.send('hello world'))
app.listen(PORT, () => console.log(`app listening at port :${PORT}`))