var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

// const Foo = sequelize.define('foo', {
//     firstname: Sequelize.STRING,
//     lastname: Sequelize.STRING
//   }, {
//     getterMethods: {
//       fullName() {
//         return this.firstname + ' ' + this.lastname
//       }
//     },
  
//     setterMethods: {
//       fullName(value) {
//         const names = value.split(' ');
  
//         this.setDataValue('firstname', names.slice(0, -1).join(' '));
//         this.setDataValue('lastname', names.slice(-1).join(' '));
//       },
//     }
//   });

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    route: {
        type: Sequelize.STRING,
        getRoute () {
            return '/wiki/' + this.urlTitle +'/'
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};
