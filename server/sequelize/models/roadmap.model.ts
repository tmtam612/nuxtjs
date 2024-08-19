import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
} from '@sequelize/core/decorators-legacy';

export class RoadMap extends Model<
    InferAttributes<RoadMap>,
    InferCreationAttributes<RoadMap>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.JSONB)
    @NotNull
    declare graph: string;

    @Attribute(DataTypes.STRING)
    declare userID: string | null;
}
