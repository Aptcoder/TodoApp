// const MailGen = require('mailgen');
// const fs = require('fs');

// const mailGenerator = MailGen({
//     theme: 'salted',
//     product: {
//         name: 'TodoApp',
//         link: 'https://mern-stack-todo.herokuapp.com'
//     }
// })
const moment = require('moment');
const MailGen = require('mailgen')
const sgMail = require('@sendgrid/mail')

const mailGenerator = new MailGen({
    theme: 'salted',
    product: {
      name: 'Todo App',
      link: 'https://mern-stack-todo.herokuapp.com',
      // logo: your app logo url
    },
  });


class MailFactory {

    static generateReminderMessage(user,todo) {
        console.log('user:',user);
        console.log('todo:', todo);
        const email = {
            body: {
                name: `${user.name}`,
                intro: 'You are receiving this mail as a reminder to a scheduled task',
                action: {
                    instructions: `You scheduled the task with title '${todo.title}' for time ${moment(todo.todoAt).format('ddd. MMM Do YYYY, h:mm a')}`,
                    button: {
                        color: '#DC4D2F',
                        text: 'mark as completed',
                        link: 'https://mern-stack-todo.herokuapp.com'
                    }
                },
                outro: 'Need help? contact the developers'
            }
        };
        const emailTemplate = mailGenerator.generate(email)
        const msg = {
            to: user.email,
            from: 'TODO APP <omilosamuel@gmail.com>',
            subject: 'Task Reminder',
            html: emailTemplate,
          };
        return msg;
    }

    static async sendMails(messages){
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            return sgMail.send(messages)
          } catch (error) {
              console.log('error  here',error)
            // throw new Error(error.message)
          }
    }
}



// const emailTemplate = mailGenerator.generate(email);
// fs.writeFileSync('preview.html', emailTemplate, 'utf8');


// require('dotenv').config()



// const email = {
//   body: {
//     name: 'Jon Doe',
//     intro: 'Welcome to email verification',
//     action: {
//       instructions: 'Please click the button below to verify your account',
//       button: {
//         color: '#33b5e5',
//         text: 'Verify account',
//         link: 'http://example.com/verify_account',
//       },
//     },
//   },
// }


// require('fs').writeFileSync('preview.html', emailTemplate, 'utf8')


// const msg = {
//     to: 'omilosamuel@gmail.com',
//     from: 'TODO APP <omilosamuel@gmail.com>',
//     subject: 'Test verification email',
//     html: emailTemplate,
//   }
  
//   const sendMail = async () => {
//     try {
//       sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//       return sgMail.send(msg)
//     } catch (error) {
//         console.log('error  here',error)
//       throw new Error(error.message)
//     }
//   }
  
  module.exports = MailFactory