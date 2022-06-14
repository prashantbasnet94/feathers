const feathers = require('@feathersjs/feathers');
const app = feathers();

function Service() {
    let self 
    function MessageService(){
        self = this
        self.messages = []
    }

    MessageService.prototype.find =async () => {
        return self.messages
    }
    MessageService.prototype.create = async (data) => {
        const message = {
            id: self.messages.length,
            text: data.text
        }
        self.messages.push(message)
        return self.messages
    }
    return new MessageService()
    
}
// class MessageService {
//     constructor() {
//       this.messages = [];
//     }
  
//     async find () {
//       // Just return all our messages
//       return this.messages;
//     }
  
//     async create (data) {
//       // The new message is the data merged with a unique identifier
//       // using the messages length since it changes whenever we add one
//       const message = {
//         id: this.messages.length,
//         text: data.text
//       }
  
//       // Add new message to the list
//       this.messages.push(message);
  
//       return message;
//     }
//   }
app.use('messages',  new Service())

//log everytime the message service is created:

app.service('messages').on('created', message => {
    console.log('A new message has been created', message)
})

// func that creates new message and then logs 
// all exisiting messages

const main = async () => {
    // create a new message on our message service
    await app.service('messages').create({text: 'hello world'})
    await app.service('messages').create({text: 'hello world 2!'})

    const messages = await app.service('messages').find()
    console.log('all messages', messages)

}
main()