print('Start #################################################################');

db.createUser({ user: "mongoadmin" , pwd: "mongoadmin", roles: [
    { role: "dbOwner", db: "test" }
  ] })