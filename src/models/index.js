import User from "./User";
import Company from "./Company";
// SYNC
await User.sync({ alter: { drop: false } })
await Company.sync({ alter: { drop: false } })

// ASSOCIATED
User.hasOne(Company, { foreignKey: 'user_id' })
Company.belongsTo(User, { foreignKey: 'user_id' })

export * from './User'
export * from './Company'