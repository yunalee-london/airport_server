const app = require('../server')
const fetch = require('node-fetch')
const BASE_URL = 'http://localhost:3001'
const request = require('supertest') //library to use for intergration test(it starts server)



describe("My Airport server", () => {
    test("can GET all the airports", (done) => {
        request(app)
            .get('/airports')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toBe(28868)
            })
            .end(done)
    })
    
    test("can GET pages of airports", (done) => {
        request(app)
            .get('/airports?page=1&pageSize=100')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(100)
            })
            .end(done)
    })

    test("can POST an airport", (done) => {
        request(app)
            .post('/airports')
            .send(`{icao: "test"}`)
            .set('Accept', 'application/json')
            .expect(201)
            .end(done)
        })
    })

    test("can PUT an airport", (done) => {
        request(app)
            .put('/airports/:icao')
            .send ('{icao: "00AK"}')
            .set('Accept', 'application/json')
            .expect(201)
            .end(done)
       })






// describe("My Airport server", () => {
//     beforeAll(done => {
//         app.listen(3001, done)
//     })

//     test('can GET airports', () => {
//         //expect(true).toBe(true) => used for initial set up test
//     return fetch(`${BASE_URL}/airports`)
//             .then(res => {
//                 expect(res.status).toBe(200)
//                 return res.json()
//             })
//             .then(airports => {
//                 expect(airports.length).toBe(28868)
//             })
// })

//     afterAll(done => {
//         app.close()
//         done()
//     })
// })

