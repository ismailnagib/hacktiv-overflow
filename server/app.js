require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const CronJob = require('cron').CronJob;
const kue = require('kue');
const queue = kue.createQueue();
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');
mongoose.connect(`mongodb://hackover:${process.env.MLAB_PASSWORD}@ds115193.mlab.com:15193/hackover-db`, { useNewUrlParser: true });

const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

new CronJob('00 * * * * *', function() {
    queue.process('email', function(job, done) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'backgroundjobtest@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        })
        let mailOptions = {
            from: 'backgroundjobtest@gmail.com',
            to: job.data.to,
            subject: job.data.title,
            html: job.data.template
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            } else {
                console.log('Message sent: %s', info.messageId);
                done()
            }
        });
    });
}, null, true, 'Asia/Jakarta');

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
