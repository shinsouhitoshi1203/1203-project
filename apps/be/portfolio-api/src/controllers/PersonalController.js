// PersonalController: This controller handles personal details and more options for rendering to the client.
import object from '@/utils/object';
import {
    PersonalDetail as Person,
    PERSONAL_DETAIL_PROJECT_OPTIONS,
    PERSONAL_DETAIL_FILTER_OPTIONS,
} from '@/models/PersonalDetailSchema';
import {
    ITEM_DISLIKE_FIELD_NAME,
    ITEM_FAVORITE_FIELD_NAME,
    ITEM_MODEL_NAME,
} from '@/models/ItemSchema';
import {
    CONTACT_MODEL_NAME,
    CONTACT_PERSONAL_FIELD_NAME,
} from '@/models/ContactSchema';

// Options for aggregation
const PERSONAL_DETAIL_AGGREGATE_OPTIONS = [
    {
        $lookup: {
            from: CONTACT_MODEL_NAME,
            as: CONTACT_MODEL_NAME,
            pipeline: [
                {
                    $match: { type: CONTACT_PERSONAL_FIELD_NAME },
                },
                {
                    $project: {
                        _id: 0, // Exclude _id from the result
                    },
                },
            ],
        },
    },
    {
        $lookup: {
            from: ITEM_MODEL_NAME,
            pipeline: [
                {
                    $match: { type: ITEM_FAVORITE_FIELD_NAME },
                },
                {
                    $project: {
                        _id: 0,
                    },
                },
            ],
            as: `${ITEM_FAVORITE_FIELD_NAME}s`,
        },
    },
    {
        $lookup: {
            from: ITEM_MODEL_NAME,
            pipeline: [
                {
                    $match: { type: ITEM_DISLIKE_FIELD_NAME },
                },
                {
                    $project: {
                        _id: 0,
                    },
                },
            ],
            as: `${ITEM_DISLIKE_FIELD_NAME}s`,
        },
    },
    {
        $project: PERSONAL_DETAIL_PROJECT_OPTIONS,
    },
];

class PersonalController {
    // GET /personal/details
    async getDetails(req, res, next) {
        try {
            // Remove the old aliases and use birthdate to calculate age

            const doc = await Person.aggregate(
                PERSONAL_DETAIL_AGGREGATE_OPTIONS
            );
            if (!doc) {
                return res
                    .status(404)
                    .json({ message: 'Personal details not found' });
            } else {
                const rawDoc = Person.hydrate(doc[0]);
                const data = rawDoc.toObject();
                object.removeFields(data, PERSONAL_DETAIL_FILTER_OPTIONS);
                return res.json(data);
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new PersonalController();
