// 몽고 DB를 임포트 한다.
const { MongoClient } = require("mongodb");

// 몽고DB 주소와 연결한다.
// 몽고DB 컴파스에 새팅한 주소
const uri = 'mongodb://localhost:27017/'

// 클라이언트를 연결한다.
const client = new MongoClient(uri)

async function run() {
    // fitstDB 라는 데이터 베이스가 생긴다.
    const database = client.db('firstDB');

    // 컬렉션을 만든다.
    const users = database.collection('users')

    // const userData = await users.insertOne({ name: "길똥", age: 22 })
    // console.log("result", userData);

    // const findUser = await users.find({}).toArray();
    // const findUser = await users.find({ age: { $gt: 20 } }).toArray();
    // console.log("result", findUser);

    // const updateUser = await users.updateOne(
    //     { name: "길똥" },
    //     { $set: { age: 33 } }
    // );

    // console.log("update", updateUser);

    // const deleteUsers = await users.deleteMany({ age: { $gt: 20 } });
    const userData = await users.find({ name: "길똥" })
        .project({ name: 1, _id: 0 }).toArray()

    console.log(userData);
}



run();