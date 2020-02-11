const dotenv = require('dotenv');
dotenv.config;
const path = require("path");
const app = require('../index.js')
const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../TestFolder/dbtest');
process.env.GROCERY = 'test';

 let token ='';
 let id ='';

describe('Testing API all routes', () => {
    before(function(done) {
        this.timeout(150000)
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });
})
    // it('Pass, should get signup', (done) => {
    //     request(app).post('/signup')
    //     .send({
           
    //         fullname:'biswas chapain',
    //         address:'ktm',
    //         phone:'9878765678',
    //          email:'aaki123@gmail.com',
    //         password:'aakriti',
    //         imageu:''
                  

    //     })
    //         .then((res) => {
    //             expect(res.statusCode)
    //           //  expect(res.body).to.contain.property('token');
    //            // token = `Bearer ${res.body.token}`;
    //            userId = res.body.id
    //             done();
    //         })
    //         .catch((err) => done(err));
    // })


    // it('Pass, Get user details', (done) => {
    //     request(app).get('/me')
    //         .set('Authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(body).to.contain.property('_id');
    //             expect(body).to.contain.property('fullname', 'Aakriti Chapain');
    //             expect(body).to.contain.property('address', 'MaitideviKtm');
    //             expect(body).to.contain.property('phone', '98761244');
    //             expect(body).to.contain.property('email', 'aakriti@gmail.com');
    //             done();
    //         })
    //         .catch((err) => done(err));
    // })



//contact
    it('Pass, fetch data to server', (done) => {
        request(app).post('/addFeedback')
            .send({
                yourname:"aaki",
                youremail: "aaki@gmail.com",
                yourfeedback: "nice"
            })
            .then((res) => {
                expect(res.statusCode).to.equal(500);
                feedbacktId = res.body.id
                done();
            })
            .catch((err) => done(err));
    })

         it('Pass, Get contact details', (done) => {
        request(app).get('/feedback')
            // .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    });

         //  product
    it('Pass, posting product data', (done) => {
        request(app).post('/addProduct')
            .send({
                name: "Litchi",
                price: "Rs.100",
                description: "wow",
                imagep: ""
            })
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                productId = res.body.id
                done();
            })
            .catch((err) => done(err));
    })

     it('Pass, Get product details', (done) => {
            request(app).get('/products')
                // .set('Authorization', token)
                .then((res) => {
                    const body = res.body;
                    // expect(body).to.contain.property('_id');
                    expect(body).to.not.be.empty;
                    done();
                })
                .catch((err) => done(err));
        })

      // it('Pass, update products info', (done) => {
      //        //let productId = res.body._id
      //       request(app).put('/update/' + productId)
            
      //           .set('Authorization', token)
      //           .send({
      //               name: "Litchi updated",
      //               price: "Rs.100",
      //               description:"wow updated",
      //               imagep: "image updated"
                    
      //           })
      //           .then((res) => {
      //               expect(res.statusCode).to.equal(200);
      //               expect(res.body).to.not.be.empty;
      //               done();
      //           })
      //           .catch((err) => done(err));
      //   })

 it('OK, create new product and delete the same product', (done) => {
            request(app).post('/addProduct')
                .set('Authorization', token)
                .send({
                    name: "product name about to delete",
                    price: "Rs.111",
                    description:"nice shop",
                    image: "product image about to delete",
                })
                .then((res) => {
                    let id = res.body._id
                    request(app).delete('/products/' + id)
                        .set('Authorization', token)
                        .then((res) => {
                            expect(res.statusCode).to.equal(200);
                            //expect(res.body).to.contain.property('status', 'Location deleted successfully');
                            done();
                        })
                        .catch((err) => done(err));
                })
                .catch((err) => done(err));
        })

    


    // it('Fail, sending empty name and password', (done) => {
    //     request(app).post('/signup').send({
    //         fullname:'',
    //         address:'ktm',
    //         phone:'9878765678',
    //          email:'aaki123@gmail.com',
    //         password:'aakriti',
    //         imageu:''
    //         })
    //         .then((res) => {
    //             expect(res.statusCode).to.equal(500)
    //             expect(res.body).to.contain.property('status', 'User validation failed: fullname: Path fullname is required.')
    //             done();
    //         })
    //         .catch((err) => done(err));
    // })

   

   //  Login
    // it('Pass, should get login token', (done) => {
    //     request(app).post('/login')
    //     .send({
    //         email:'aakriti@gmail.com',
    //         password:'aakriti',           

    //     })
    //         .then((res) => {
    //             expect(res.statusCode).to.equal(200)
    //             // expect(res.body).to.contain.property('token');
    //             expect(res.body).to.contain.property('status', 'User not found!', 'token');
    //             token = `Bearer ${res.body.token}`;
    //             done();
    //         })
    //         .catch((err) => done(err));
    // })




//     it('Fail, provided dummy token', (done) => {
//         request(app).get('/me')
//             .set('Authorization', 'dummytoken')
//             .then((res) => {
//                 const body = res.body;
//                 expect(body).to.not.be.empty;
//                 done();
//             })
//             .catch((err) => done(err));
//     })



    it('Fail, sending empty email', (done) => {
        request(app).post('/addFeedback').send({
            youremail:'',
            yourfeedback:'contactt', 
            })
            .then((res) => {
                expect(res.statusCode).to.equal(500)
                done();
            })
            .catch((err) => done(err));
    })



    it('Fail, empty body', (done) => {
        request(app).get('/feedbacks')
            // .set('Authorization', 'dummytoken')
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })


    it('Fail, passing empty value', (done) => {
            request(app).post('/addProduct').send({
                name:'hmm',
                price:'121',
                description:'',
                image:'' 
                })
                .then((res) => {
                    expect(res.statusCode).to.equal(500)
                    done();
                })
                .catch((err) => done(err));
        })

   

        it('Fail, get empty values', (done) => {
            request(app).get('/products')
                // .set('Authorization', 'dummytoken')
                .then((res) => {
                    const body = res.body;
                    expect(body).to.not.be.empty;
                    done();
                })
                .catch((err) => done(err));
        })     


//           it('Fail, sending empty email as login detail', (done) => {
//         request(app).post('/signup').send({
//             email:'',
//             password:'aakriti', 
//             })
//             .then((res) => {
//                 expect(res.statusCode).to.equal(500)
// //                expect(res.body).to.contain.property('status', 'User validation failed: fullName: Path fullName is required.')
//                 done();
//             })
//             .catch((err) => done(err));
//     })