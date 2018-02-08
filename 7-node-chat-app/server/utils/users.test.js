const expect = require('expect');
const { Users } = require('./users');


describe('Users', () => {
  let users;
  const user1 = {id: '1', name: 'Mike', room: 'Node Course'};
  const user2 = {id: '2', name: 'Jen', room: 'React Course'};
  const user3 = {id: '3', name: 'Julie', room: 'Node Course'};
  beforeEach(() => {
    users = new Users();
    users.users = [user1,user2,user3]
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {id: '0', name: 'Floyd',room: 'The Office Fans'};
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    expect(users.getUserList('Node Course'))
      .toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    expect(users.getUserList('React Course'))
      .toEqual(['Jen']);
  });

  it('should remove a user', () => {
    expect(users.removeUser(user1.id).name).toBe('Mike');
    expect(users.users).toEqual([user2, user3]);
  });

  it('should not remove user', () => {
    expect(users.removeUser('123')).toBeUndefined();
    expect(users.users).toEqual([user1, user2, user3])
  });

  it('should find user', () => {
    expect(users.getUser(user2.id)).toEqual(user2);
  });

  it('should not find user', () => {
    expect(users.getUser('123')).toBeUndefined();
  });
});