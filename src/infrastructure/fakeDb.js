let users =[ 
   {
    id: '1',
    username: 'Robin Wieruch',
  },
   {
    id: '2',
    username: 'Dave Davids',
  },
  {
    id: 'fock-you',
    username: 'fock_you_99'
  } 
];

const me = users[2];

const messages = [
  {
    id: '1',
    content: 'You mom gay',
    user: users[1]
  },
  {
    id: '3',
    content: 'Little ponies are sexy',
    user: users[0]
  },
  {
    id: '4',
    content: 'You little prick',
    user: users[0]
  },
  {
    id: '5',
    content: 'How to speak with a tree',
    user: users[0]
  },
  {
    id: '6',
    content: 'Are coins toxic',
    user: users[0]
  },
   {
    id: '7',
    content: 'Benefits of eating glue',
    user: users[0]
  }
]

function addToMessages(message) {
  messages.push(message)
}

function deleteMessage(index) {
  console.log('op op');
  messages.splice(index, 1);
}

export default {
  users,
  me,
  messages,
  addToMessages,
  deleteMessage
}
