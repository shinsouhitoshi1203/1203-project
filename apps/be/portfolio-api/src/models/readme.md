# Model naming conventions (MVC Pattern)

## 0. General Guidelines

### a. `COLLECTION_NAME`

-   `COLLECTION_NAME` is the name of the collection **in singular format**.

    > If the name is in snake_case with underscores, it should be converted to `SCREAMING_SNAKE_CASE`. For example: `personal_details` becomes `PERSONAL_DETAIL`.

-   Example:
    If the collection name is `items`, the schema name should be `ItemSchema`. If the collection name is `personal_details`, the schema name should be `PersonalDetailSchema`.

    So in these cases:

    -   `ItemSchema` is the schema for items. It returns a schema object with the properties of the items.
    -   `ContactSchema` is the schema for contacts. It returns a schema object with the properties of the contacts.

### b. `MODEL_NAME`

-   `PART` is the part of the schema.

    > It can be `SCHEMA`, `MODEL`, `OPTIONS`, etc.

### c. `PROPERTY`

-   `PROPERTY` is the property of the schema.

    > It can be `NAME`, `OPTIONS`, `ENUM`, etc.

## 1. Constants

-   Must be in `SCREAMING_SNAKE_CASE`
-   Must be descriptive enough and must follow the pattern

`<COLLECTION_NAME>_<PART>_<PROPERTY>`.

> In case of using constants globally, the pattern is `<PART>_<PROPERTY>`
>
> For example, `SCHEMA_OPTIONS` is a global constant that contains options for all schemas.

-   Example:

*   `ITEMS_MODEL_NAME` is the name of the collection for items. It returns a string with the name of the collection.
*   `ITEMS_SCHEMA_OPTIONS` is the options for the items schema. It returns an object with the options for the schema. Do not use `CONFIG`.

## 2. Schema

-   Must be in `PascalCase`
-   Must be descriptive enough and must follow the pattern `<COLLECTION_NAME>Schema`.

## 3. Models

-   Must be in `PascalCase`
-   Must be descriptive enough and must follow the pattern `<COLLECTION_NAME>s`

    > `s` at the end is optional, but it is recommended to use it for collections that contain multiple items.

-   Example:

    -   `Items` is the model for items. It returns a model object with the properties of the items.
    -   `Contacts` is the model for contacts. It returns a model object with the properties of the contacts.
