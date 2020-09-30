const Todo = require('../database/models').Todo
const User = require('../database/models').User
const {Op} = require('sequelize')
const chalk = require('chalk');
const MailFactory = require('./mail');

class NotificationFactory {
    static async getTodosThatNeedReminders(){
        console.log('here sha')
        try {
            const todos = await Todo.findAll({
                where: {
                    todoAt: {
                        [Op.gte]: new Date(new Date - 1.5 * 60 * 1000),
                        [Op.lt]: new Date()
                    },
                },
                include: {model:  User, as: 'author' }
            });
            if(!todos.length){
                return;
            }
            // console.log('todos:', todos)
            return todos;
        }
        catch(e){
            console.log(chalk.red('----notification error----'),e)
            throw new Error(e)
        }
    }
    static async start (){
        try {
            const todos = await NotificationFactory.getTodosThatNeedReminders();
            if(!todos){
                return;
            }
            const messages = todos.filter((todo) => {
                if(todo.dataValues.isCompleted){
                    return false;
                }
                return true;
            }).map((todo, index) => {
                // console.log('todo',index, todo)
                const msg = MailFactory.generateReminderMessage(todo.dataValues.author.dataValues,todo.dataValues)
                return msg;
            });
            await MailFactory.sendMails(messages)
        }
        catch(e){
            console.log(chalk.red('----notification error----'),e)
        }
        
}
}

module.exports = NotificationFactory