import { model, Schema } from 'mongoose';
import SCHEMA_OPTIONS from '@/models/schemaOptions';

// Enum for contact types
const CONTACT_TYPE_ENUM = ['personal', 'work'];

// Model name for contacts
const CONTACT_MODEL_NAME = 'contacts';

// Contact schema for user contacts
const ContactSchema = new Schema(
    {
        // Name of the contact
        name: {
            type: String,
            required: true,
        },

        // Contact scope (in personal use or professional use)
        type: {
            type: String,
            required: true,
            enum: ['personal', 'professional'],
            validate: x => {
                // Validate that the type is either 'personal' or 'professional'
                return ['personal', 'professional'].includes(x);
            },
        },

        // Type of platform
        platform: {
            type: String,
            required: true,
        },

        // URL of the contact
        url: {
            type: String,
            required: true,
        },

        // Icon for the contact, typically a Font Awesome class
        icon: {
            type: String,
            required: true,
            default: 'fa-solid fa-link',
        },
    },
    SCHEMA_OPTIONS
);

// Model (instance) for ContactSchema
const Contacts = model(CONTACT_MODEL_NAME, ContactSchema, CONTACT_MODEL_NAME);

// Options to help filter out fields from the item schema
const CONTACT_PERSONAL_FIELD_NAME = CONTACT_TYPE_ENUM[0]; // 'personal'
const CONTACT_WORK_FIELD_NAME = CONTACT_TYPE_ENUM[1]; // 'work'

export default ContactSchema;
export {
    CONTACT_MODEL_NAME,
    CONTACT_PERSONAL_FIELD_NAME,
    CONTACT_WORK_FIELD_NAME,
    Contacts,
};
