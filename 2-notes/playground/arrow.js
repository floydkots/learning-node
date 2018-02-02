let square = x => x*x;
console.log(square(9));

let user = {
  name: 'Floyd',
  sayHi: () => {
    console.log(`Hi i'm ${this.name}`);
  },
  sayHiAlt () {
    console.log(`Hi i'm ${this.name}`);
  }
};

user.sayHi();
user.sayHiAlt();