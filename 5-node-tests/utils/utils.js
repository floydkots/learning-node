module.exports.add = (a, b) => a + b;

module.exports.square = (x) => x*x;

module.exports.setName = (user, fullName) => {
  let [firstName, lastName] = fullName.split(" ");
  user.firstName = firstName;
  user.lastName = lastName;
  return user;
};