var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return '/wiki/' + this.getDataValue('urlTitle')
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
    },
    tag: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
    }
});


Page.hook('beforeValidate', (page, options) => {
    var title = page.title
    if (title) {
      page.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      page.urlTitle = Math.random().toString(36).substring(2, 7);
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

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db: db,
  Page: Page,
  User: User
};
