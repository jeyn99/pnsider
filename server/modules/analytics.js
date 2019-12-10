const Post = require('../model/Answer');

function analytics(category, number) {
    return new Promise((resolve, reject) => {
        //kulang og match para sa date, batch
        //mangayo ko date para sa match
        Post.aggregate([
            {
                $match:{
                    timestamp:{ $lte: new Date(), $gt:new Date(Date.now() - 12096e5)}
                }
            }, 
            {
                $group: {
                    _id: `$categories.${category}.Q${number}`,
                    answers: { $sum: 1 },
                    timestamp:{  $first: '$timestamp' }
                }
            },
            {
                $project: {
                    _id: 1,
                    description: { $ifNull: ["Q" + number, "Unspecified"] },
                    answers: 1,
                    timestamp:1
                   
                }
            },
        ])
            .then((data) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getLength(){
    return new Promise((resolve, reject) =>{
       // {$gt:filter.rangeDate, $lt:filter.date}
       //{date:{$gt:filter.rangeDate, $lt:filter.date}}
        Post.countDocuments().then(data => {
            resolve(data);
           })
           .catch(err =>{
             reject(err);
           });
    });
}

function getStudents(data, projection){
    return new Promise((resolve, reject) =>{
        let select = 'firstname lastname gender batch id';
        let filter = {timestamp:{$lte:data.date}};
        filter[`categories.${data.category}.${data.questionNumber}`] = data.value;

        Post.find(filter, projection)
        .populate('studentID', select)
        .sort({timestamp: 1})
        .then( data =>{
            if(data){
                resolve(data);
            }else{
                resolve('not users');
            }
        })
        .catch(err =>{
            console.log(err);
            reject(err);
        });
    });
}


// function getStudentsInfo(id){
//     return new Promise((resolve, reject) =>{

//     })
// }


module.exports = {
    analytics,
    getLength,
    getStudents

};