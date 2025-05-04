/* global use, db */
// MongoDB Playground
const database = "thuongdinhlib";

// Create a new database
use(database);

// Create Books collection
db.createCollection("books", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "title",
                "isbn",
                "author",
                "category",
                "publishYear",
                "price",
                "quantity",
            ],
            properties: {
                title: { bsonType: "string" },
                isbn: { bsonType: "string" },
                author: { bsonType: "string" },
                category: { bsonType: "string" },
                publishYear: { bsonType: "int" },
                price: { bsonType: "decimal" },
                quantity: { bsonType: "int" },
                description: { bsonType: "string" },
                image: { bsonType: "string" }, // Thêm trường image
            },
        },
    },
});

// Create Staff collection
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

// Create Customers collection
db.createCollection("customers", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "phone", "password"],
            properties: {
                name: { bsonType: "string" },
                email: { bsonType: "string" },
                phone: { bsonType: "string" },
                address: { bsonType: "string" },
                membershipDate: { bsonType: "date" },
                password: { bsonType: "string" },
            },
        },
    },
});

// Insert sample books
db.books.insertMany([
    {
        title: "Cho tôi xin một vé đi tuổi thơ",
        isbn: "9786041848047",
        author: "Nguyễn Nhật Ánh",
        category: "Văn học Việt Nam",
        publishYear: 2008,
        price: NumberDecimal("75000"),
        quantity: 50,
        description: "Truyện về tuổi thơ",
        image: "/images/books/cho-toi-xin-mot-ve-di-tuoi-tho.jpg",
    },
    {
        title: "Norwegian Wood",
        isbn: "9784061848474",
        author: "Murakami Haruki",
        category: "Văn học nước ngoài",
        publishYear: 1987,
        price: NumberDecimal("250000"),
        quantity: 30,
        description: "Norwegian Wood - Japanese Edition",
        image: "/images/books/norwegian-wood.jpg",
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        isbn: "9780747532699",
        author: "J.K. Rowling",
        category: "Văn học nước ngoài",
        publishYear: 1997,
        price: NumberDecimal("200000"),
        quantity: 40,
        description: "First book in Harry Potter series",
        image: "/images/books/harry-potter-and-the-philosophers-stone.jpg",
    },
    {
        title: "Tôi thấy hoa vàng trên cỏ xanh",
        isbn: "9786041846043",
        author: "Nguyễn Nhật Ánh",
        category: "Văn học Việt Nam",
        publishYear: 2010,
        price: NumberDecimal("85000"),
        quantity: 45,
        description: "Câu chuyện về tuổi thơ ở một vùng quê nghèo",
        image: "/images/books/toi-thay-hoa-vang-tren-co-xanh.jpg",
    },
    {
        title: "Dế Mèn phiêu lưu ký",
        isbn: "9786041847521",
        author: "Tô Hoài",
        category: "Văn học thiếu nhi",
        publishYear: 2015,
        price: NumberDecimal("65000"),
        quantity: 60,
        description: "Tác phẩm văn học thiếu nhi nổi tiếng",
        image: "/images/books/de-men-phieu-luu-ky.jpg",
    },
    {
        title: "Đắc nhân tâm",
        isbn: "9786047891245",
        author: "Dale Carnegie",
        category: "Kỹ năng sống",
        publishYear: 2016,
        price: NumberDecimal("115000"),
        quantity: 35,
        description: "Nghệ thuật đối nhân xử thế",
        image: "/images/books/dac-nhan-tam.jpg",
    },
    {
        title: "1984",
        isbn: "9780451524935",
        author: "George Orwell",
        category: "Văn học nước ngoài",
        publishYear: 2019,
        price: NumberDecimal("180000"),
        quantity: 25,
        description: "Tiểu thuyết chính trị viễn tưởng",
        image: "/images/books/1984.jpg",
    },
    {
        title: "Nhà giả kim",
        isbn: "9786041845632",
        author: "Paulo Coelho",
        category: "Văn học nước ngoài",
        publishYear: 2017,
        price: NumberDecimal("95000"),
        quantity: 55,
        description: "Câu chuyện về hành trình theo đuổi giấc mơ",
        image: "/images/books/nha-gia-kim.jpg",
    },
    {
        title: "Sherlock Holmes Toàn Tập",
        isbn: "9786041847852",
        author: "Arthur Conan Doyle",
        category: "Trinh thám",
        publishYear: 2018,
        price: NumberDecimal("450000"),
        quantity: 20,
        description: "Tuyển tập truyện trinh thám nổi tiếng",
        image: "/images/books/sherlock-holmes-toan-tap.jpg",
    },
    {
        title: "Số đỏ",
        isbn: "9786041843652",
        author: "Vũ Trọng Phụng",
        category: "Văn học Việt Nam",
        publishYear: 2020,
        price: NumberDecimal("78000"),
        quantity: 40,
        description: "Tác phẩm văn học phê phán xã hội",
        image: "/images/books/so-do.jpg",
    },
    {
        title: "Bố già",
        isbn: "9786041849654",
        author: "Mario Puzo",
        category: "Văn học nước ngoài",
        publishYear: 2018,
        price: NumberDecimal("195000"),
        quantity: 30,
        description: "Tiểu thuyết về mafia Italy",
        image: "/images/books/bo-gia.jpg",
    },
    {
        title: "Cô gái đến từ hôm qua",
        isbn: "9786041842569",
        author: "Nguyễn Nhật Ánh",
        category: "Văn học Việt Nam",
        publishYear: 2017,
        price: NumberDecimal("82000"),
        quantity: 45,
        description: "Câu chuyện tình học trò trong sáng",
        image: "/images/books/co-gai-den-tu-hom-qua.jpg",
    },
    {
        title: "Hoàng tử bé",
        isbn: "9786041847963",
        author: "Antoine de Saint-Exupéry",
        category: "Văn học thiếu nhi",
        publishYear: 2019,
        price: NumberDecimal("89000"),
        quantity: 50,
        description: "Câu chuyện triết lý sâu sắc cho mọi lứa tuổi",
        image: "/images/books/hoang-tu-be.jpg",
    },
]);

// Insert sample staff
db.staff.insertMany([
    {
        name: "Nguyễn Văn An",
        email: "an.nv@thuongdinhlib.com",
        phone: "0901234567",
        role: "Quản lý",
        isAdmin: true,
        salary: NumberDecimal("15000000"),
        password:
            "$2a$10$XQkJz9vR8ZiX4YWj3TWGqODJ3ZtC8yF7U8p6VMjy4.XyI3vxdqgkS", // hash for "password123"
    },
    {
        name: "Trần Thị Bình",
        email: "binh.tt@thuongdinhlib.com",
        phone: "0912345678",
        role: "Thủ thư",
        salary: NumberDecimal("8000000"),
        password:
            "$2a$10$XQkJz9vR8ZiX4YWj3TWGqODJ3ZtC8yF7U8p6VMjy4.XyI3vxdqgkS", // hash for "password123"
    },
]);

// Insert sample customers
db.customers.insertMany([
    {
        name: "Lê Văn Cường",
        email: "cuong@example.com",
        phone: "0923456789",
        address: "Hà Nội",
        membershipDate: new Date("2023-01-15"),
        password:
            "$2a$10$XQkJz9vR8ZiX4YWj3TWGqODJ3ZtC8yF7U8p6VMjy4.XyI3vxdqgkS", // hash for "password123"
    },
    {
        name: "Phạm Thị Dung",
        email: "dung@example.com",
        phone: "0934567890",
        address: "Hồ Chí Minh",
        membershipDate: new Date("2023-02-20"),
        password:
            "$2a$10$XQkJz9vR8ZiX4YWj3TWGqODJ3ZtC8yF7U8p6VMjy4.XyI3vxdqgkS", // hash for "password123"
    },
]);
