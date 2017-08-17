const assert = require('assert');
const User = require('../src/user');

describe('Updates a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  it('instance type using set and save', (done) => {
    joe.set({ name: 'Mike' });
    assertName(joe.save(), done)
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Mike' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Mike' }),
      done()
    );
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Mike' }), done);
  });

  it('A model class can find a record with an id and update', (done) => {
    assertName(User.findByIdAndUpdate({ _id: joe._id }, { name: 'Mike' }), done);
  });

  it('A user can have their post count incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done()
      });
    
  });

});

function assertName(operation, done) {
  operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Mike')
      done()
    });
}