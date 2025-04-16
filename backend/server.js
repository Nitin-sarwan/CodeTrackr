const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const LeetCodeRouter = require('./routers/LeetCodeRouter');
const CodeChefRouter = require('./routers/CodeChefRouter');
const CodeforcesRouter = require('./routers/CodeforcesRouter');
const userRouter = require('./routers/UserRoutes');


app.use('/api/user', userRouter);
app.use('/api/leetCode', LeetCodeRouter);
app.use('/api/codeChef', CodeChefRouter);
app.use('/api/codeforces', CodeforcesRouter);

server.listen(port,()=>{
    console.log(`Server is running on: https://localhost:${port}`);
});