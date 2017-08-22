const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    beth = new User({ name: 'Beth' });
    joe = new User({ name: 'Joe' });
    mike = new User({ name: 'Mike' });
    steve = new User({ name: 'Steve' });
    Promise.all([beth.save(), joe.save(), mike.save(), steve.save()])
      .then(() => done());
  });

  it('finds all users with the name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
  
  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === "Joe");
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Mike');
        done();
      });
  });
});