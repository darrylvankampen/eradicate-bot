module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guilds', {
        guild_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}