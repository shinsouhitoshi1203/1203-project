import { model, Schema } from 'mongoose';
import SCHEMA_OPTIONS from '@/models/schemaOptions';

// Enum for item types
const ITEM_TYPE_ENUM = ['favorite', 'dislike'];

// Default image is used internally for items.
const DEFAULT_IMAGE =
    'https://miro.medium.com/v2/resize:fit:620/1*kwN_Y8GNf2ZB6sNQxngVyw@2x.jpeg';

// Model name for items
const ITEM_MODEL_NAME = 'items';

// Schema for items, such as favorites or dislikes
const ItemSchema = new Schema(
    {
        // Type of item, can be 'favourite' or 'dislike'
        type: {
            type: String,
            required: true,
            enum: ITEM_TYPE_ENUM,
            validate: (x) => {
                // Validate that the type is either 'favourite' or 'dislike'
                return ITEM_TYPE_ENUM.includes(x);
            },
        },
        // Name of the item
        name: {
            type: String,
            required: true,
        },

        // Description for the item
        description: {
            type: [String],
        },

        // Font Awesome icon class for the item. Used to display an icon
        icon: {
            type: String,
            required: true,
            default: function () {
                if (this.type == ITEM_TYPE_ENUM[0]) {
                    return 'fa-solid fa-star';
                } else {
                    return 'fa-solid fa-thumbs-down';
                }
            },
        },

        // Image for the item. This will only be used when explaining
        image: {
            type: String,
            required: false,
            default: DEFAULT_IMAGE,
        },
    },
    SCHEMA_OPTIONS
);

// Model (instance) for ItemSchema
const Items = model(ITEM_MODEL_NAME, ItemSchema, ITEM_MODEL_NAME);

// Options to help filter out fields from the item schema
const ITEM_FAVORITE_FIELD_NAME = ITEM_TYPE_ENUM[0]; // 'favorite'
const ITEM_DISLIKE_FIELD_NAME = ITEM_TYPE_ENUM[1]; // 'dislike'

export default ItemSchema;
export {
    ITEM_MODEL_NAME,
    Items,
    ITEM_FAVORITE_FIELD_NAME,
    ITEM_DISLIKE_FIELD_NAME,
};
