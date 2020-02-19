module.exports = (sequelize, DataTypes) => {
    return sequelize.define('currencies', {
        user_id: {
            type: DataTypes.STRING
        },
        wallet: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
        },
        bank: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}