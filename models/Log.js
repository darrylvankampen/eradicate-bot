module.exports = (sequelize, DataTypes) => {
    return sequelize.define('logs', {
        guild_id: {
            type: DataTypes.STRING,
        },
        command: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        executor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mentioned: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true
    })
}