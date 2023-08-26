import User from "./User";

// SYNC
await User.sync({ alter: { drop: false } })


export * from './User'