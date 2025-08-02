import { Schema, model } from 'mongoose';
import SCHEMA_OPTIONS from '@/models/schemaOptions';

// import { Items } from "@/models/ItemSchema";

// Model name for personal details
const PERSONAL_DETAIL_MODEL_NAME = 'personal_details';

// Project configuration for personal details. Only use for rendering to the client. This will not be used for database operations.
const PERSONAL_DETAIL_PROJECT_OPTIONS = {
    // project options
    _id: 0, // Exclude _id from the result
    'name.first': 0, // Exclude first name
    'name.last': 0, // Exclude last name
    'location.country': 0, // Exclude country from location
    'location.province': 0, // Exclude province from location
    old_aliases: 0, // Exclude old aliases
};

// Fields to filter out from the personal details response
const PERSONAL_DETAIL_FILTER_OPTIONS = [
    'old_aliases',
    'name',
    'fullName',
    'birthdate',
    'id',
    /_/g, // Regex to match any field that uses an underscores
];

// PersonalDetailSchema for personal details
const PersonalDetailSchema = new Schema(
    {
        // Username for the personal profile
        username: {
            type: String,
            required: true,
            unique: true,
        },

        // Old alias for the user
        old_aliases: {
            type: [String],
        },

        // Person's real name
        name: {
            first: {
                type: String,
                required: true,
                select: false,
            },
            last: {
                type: String,
                required: true,
                select: false,
            },
        },

        // Birthdate of the person
        birthdate: {
            type: Date,
            required: true,
            select: false,
        },

        // Location of the person
        location: {
            province: {
                type: String,
                required: true,
                select: false, // Hide province in default queries
            },
            country: {
                type: String,
                required: true,
                select: true,
            },
        },

        // Gender
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },

        // Personality trait (istj, mbti, etc.)
        personality: {
            type: String,
            required: true,
        },

        // Height of the person
        height: {
            type: Number,
            required: true,
        },

        // Fact
        fact: {
            type: String,
            required: true,
        },

        // Intros
        intros: {
            type: [String],
            required: true,
        },

        // Motto
        motto: {
            type: String,
            required: true,
        },

        // Image for motto
        img_motto: {
            type: String,
            required: true,
            alias: 'mottoImage', // Alias for better readability
        },

        // Avatar
        avatar: {
            type: String,
            required: true,
        },

        portfolio_type: {
            type: String,
            enum: ['personal', 'work'],
            required: true,
        },

        top_text: {
            type: String,
            required: true,
            alias: 'topText', // Alias for better readability
        },
        /* References to other data */
    },
    SCHEMA_OPTIONS
);

/* 

    Virtuals for PersonalSchema
    *@fullName: Returns the full name based on the order specified (firstLast or lastFirst).
    *@age: Calculates the age based on the birthdate.
    *@displayHeight: Returns the height in a formatted string (e.g., "180 cm").

*/

PersonalDetailSchema.virtual('fullName').get(function () {
    // Return the full name based on the specified order
    return `${this.name.first} ${this.name.last}`;
});

PersonalDetailSchema.virtual('age').get(function () {
    // Calculate the age based on the birthdate
    const now = new Date();
    const bd = new Date(this.birthdate);
    const diff = now - bd;

    const age = Math.trunc(diff / (1000 * 3600 * 24 * 365.25)); // Approximate years
    const ageNumber = age < 0 ? 0 : age; // Ensure age is not negative
    const ageString = ageNumber + ' y.o.'; // Format age as a string for frontend
    return ageString;
});

PersonalDetailSchema.virtual('displayHeight').get(function () {
    // Format the height in cm
    return `${this.height} cm`;
});

PersonalDetailSchema.virtual('metaInformation').get(function () {
    // Return meta information about the person: age, height, personality and gender
    return {
        age: this.age,
        height: this.displayHeight,
        personality: this.personality,
        gender: this.gender,
    };
});

// Person model (instance) for PersonalDetailSchema
const PersonalDetail = model(
    PERSONAL_DETAIL_MODEL_NAME,
    PersonalDetailSchema,
    PERSONAL_DETAIL_MODEL_NAME
);

export default PersonalDetailSchema;

export {
    PERSONAL_DETAIL_MODEL_NAME,
    PERSONAL_DETAIL_PROJECT_OPTIONS,
    PERSONAL_DETAIL_FILTER_OPTIONS,
    PersonalDetail,
};
