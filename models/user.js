const logger = require('log4js').getLogger()

const users = [{ email: 'user1@webmail.com', password: '$2b$10$XpqVA..KjXjnzIByJ9DbV.r5uZLJyvL9PxxvL3QBhiMyGjK4tkKIG' },
{ email: 'user2@webmail.com', password: '$2b$10$d8K4NmwXchmIz2m5EkQbBuBr0ANRRccmcoTWSlANBDyIxSMcFHBDu' }]


exports.getUser =(email) => {
    return new Promise((resolve,reject) =>{
    var user = users.filter( data => {
          return data.email == email;
     })[0]
     logger.info("Retrieved user data succefully")
    resolve(user);
    });
}

exports.saveUser = (data) =>{
    return new Promise ((resolve,reject) => {
        users.push(data)
        logger.info("Added user successfully")
        resolve (users)
    });
}