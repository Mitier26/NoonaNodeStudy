// const { MongoClient } = require("mongodb");
// 몽고DB를 사용하기 위해 선언한다.

// const uri = `mongodb://localhost:27017`
// DB의 주소를 입력한다.

// const client = new MongoClient(uri);
// 클라이언트를 만들고 주소를 입력한다.

async function run() {
    // const database = client.db('firstDB');
    // 데이터베이스를 만든다.
    // const users = database.collection('users');
    // users라는 컬렉션을 만든다. 컬렉션은 DB의 Table과 같다.

    // const userData = await users.insertOne({ name: 'mitier', age: 19 })
    // 한 개의 데이터를 추가한다.
    // 데이터를 추가하는 것은 서버에 연결하는 것이고 바로 실행되지 않는다.
    // await로 통신이 완료될 때 까지 기다려 주어야 한다.
    // await를 사용하기 위해서는 async 함수여야한다.

    // console.log("result", userData);

    // const userList = [{ name: '홍길동', age: 30 }, { name: "둘리", age: 53 }]
    // const userListResult = await users.insertMany(userList);

    // console.log("result", userListResult);

    // const findUser = await users.findOne({ name: 'mitier' });
    // 특정한 데이터를 찾는 방법

    // const findUser = await users.find({}).toArray();
    // DB안에 있는 모든 데이터를 찾는 방법
    // toArray() 가 있어야 한다.
    // 없으면 다른 이상한 것 까지 출력이 된다.

    // const findUser = await users.find({ age: { $gt: 20 } }).toArray();
    // 특정 조건에 맞는 데이터를 찾는다.
    // $gt 는 오퍼레이터 라고 하는 크다 라는 것이다.
    // 나이가 20살 보다 큰것을 출력한다.
    // findOne으로 찾으면 처음 찾은 1개의 데이터만 출력된다.
    // 수식을 만드는 것을 기억해야 한다 find({찾을것: {조건:20}}).toArray();
    // console.log("result", findUser);

    // const updateUser = await users.updateOne({ name: 'mitier' }, { $set: { name: 'molkang' } });
    // 수정하기
    // 수정할 때는 모든것은 다 변경하는 것을 막기위해 특정 컬럼을 지정해 주어야한다.
    // updateOne({찾는 컬럼},{$set: {바꿀 것}})
    // console.log("Update", updateUser);

    // const deleteUsers = await users.deleteMany({ age: { $gt: 30 } });
    // 삭제하기
    // 조건에 맞는 데이터를 삭제한다.
    // console.log("Delete", deleteUsers);

    // const userData = await users.find({ name: "molkang" }).project({ _id: 0 }).toArray();
    // const userData = await users.find({ name: "molkang" }).project({ name: 1 }).toArray();
    // const userData = await users.find({ name: "molkang" }).project({ _id: 0, name: 1 }).toArray();
    // 모든 것을 찾아주는 find에서 특정 데이터만 선별해서 볼수 있다.
    // project({보고싶은것, 보기싫은것})
    // 0 : 빼기
    // 1 : 보기
    // console.log("userData", userData);
}

// run();

// 문제
// 1. 몽고DB를 임포트해준다.
const { MongoClient } = require('mongodb');

// 2. 연결할 DB의 주소를 입력한다.
const uri = 'mongodb://localhost:27017/'

// 3. 주소를 연결한고 만든다. new MongoClient(주소)
const client = new MongoClient(uri);

const database = client.db("testDB");

async function test() {
    // 4. 데이터 베이스를 만든다.

    // 5. 컬럼을 만든다, 컬럼 = 컬렉션
    const inventory = database.collection('inventory');

    // 6. 데이터를 1개 넣는다.
    // const itemDB = inventory.insertOne({ item: 'canvas', qty: 100, tags: ['cotton'], size: { h: 28, w: 35.5, uon: 'cm' } });
    // console.log('InsertResult')

    // 7. 데이터를 여러개 넣는다.
    // const itemsDB = inventory.insertMany([
    //     { item: 'journal', qty: 25, tags: ['black', 'red'], size: { h: 14, w: 21, uom: 'cm' } },
    //     { item: 'mat', qty: 85, tags: ['gray'], size: { h: 27.9, w: 35.5, uom: 'cm' } },
    //     { item: 'mousepad', qty: 25, tags: ['gel', 'blue'], size: { h: 19, w: 22.85, uom: 'cm' } }])
    // console.log("InsertItems", itemsDB);
    // 여러개의 데이터를 입력할 때는 [] 리스트 형태로 넣어 주어야 한다.

    // // 8. 모든 데이터를 찾는다.
    // const findItems = await inventory.find({}).toArray();
    // console.log(findItems);
    // await 필수, 매우 중요

    // // 9. status를 추가한다.
    // journal 문서에 status 필드 추가 (status "A")
    // inventory.updateOne({ item: 'journal' }, { $set: { status: 'A' } });

    // mat 문서에 status 필드 추가 (status "B")
    // inventory.updateOne({ item: 'mat' }, { $set: { status: 'B' } });

    // mousepad 문서에 status 필드 추가 (status "D")
    // inventory.updateOne({ item: 'mousepad' }, { $set: { status: 'D' } });

    // canvas 문서에 status 필드 추가 (status "A")
    // inventory.updateOne({ item: 'canvas' }, { $set: { status: 'A' } });


    // // 10. 새로운 데이터를 추가한다.
    // const addNewItems = await inventory.insertMany([
    //     { item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: "A" },
    //     { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: "D" },
    //     { item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: "D" },
    //     { item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: "A" }])
    // console.log("NewItems", addNewItems);

    // 11. status가 D인 데이터를 찾아라
    // const statusD = await inventory.find({ status: "D" }).toArray();
    // console.log(statusD);

    // 12. status가 "A" 이고 qty가 50인 데이터
    // console.log(await inventory.find({ status: "A", qty: 50 }).toArray());

    // 13. 쿼리 $in 사용하기 status가 A 또는 B 인 데이터
    // console.log(await inventory.find({ status: { $in: ["A", "B"] } }).toArray());

    // 14. status가 A qty가 30보다 작은 데이터
    // console.log(await inventory.find({ status: "A", qty: { $lt: 30 } }).toArray());
    // console.log(await inventory.find({ $or: [{ status: "D", qty: { $gt: 40 } }] }).toArray());

    // 15. size에 uom 가 in 데이터
    // console.log(await inventory.find({ 'size.uom': 'in' }).toArray())

    // 16. size에 h가 10을 초과하는 데이터
    // console.log(await inventory.find({ 'size.h': { $gt: 10 } }).toArray());
}
// test();

// 17. students 컬렉션에 해당 데이터를 넣자.
function studentTest() {
    const studentDB = database.collection("students");

    // studentDB.insertMany([
    //     { _id: 1, test1: 95, test2: 92, test3: 90, modified: new Date("01/05/2020") },
    //     { _id: 2, test1: 98, test2: 100, test3: 102, modified: new Date("01/05/2020") },
    //     { _id: 3, test1: 95, test2: 110, modified: new Date("01/04/2020") }
    // ])

    // 18. id 3 인 학생에게 test3 의 점수를 넣어준다.
    // studentDB.updateOne({ _id: 3 }, { $set: { test3: 98 } });

    // 19. 모든 test1 점수를 0으로 하고, status:"modified"를 추가한다.
    // studentDB.updateMany({}, { $set: { test1: 0, status: "modified" } });

    // 20. test가 92점인 학생을 삭제한다.
    // const deleteStudent = studentDB.deleteOne({ test2: 92 });
    // console.log(deleteStudent);

    // test1의 점수가 0인 학생을 삭제한다.
    // studentDB.deleteMany({ test1: 0 });
}

studentTest();