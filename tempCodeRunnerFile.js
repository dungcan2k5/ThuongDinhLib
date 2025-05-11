db.createCollection("staff", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "phone", "role", "password"],
            properties: {
                name: { bsonType: "string" },
                email: { bsonType: "string" },
                phone: { bsonType: "string" },
                role: { bsonType: "string" },
                salary: { bsonType: "decimal" },
                password: { bsonType: "string" },
            },
        },
    },
});
