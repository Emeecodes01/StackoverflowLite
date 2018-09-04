const pool = require('../../database')

const insertQuestionString = 'INSERT INTO questions_table(userId, question) VALUES($1, $2) RETURNING *'

exports.insertQuestion = (req, res) =>{
    const user = {
        userId: req.user.id, 
        question: req.body.question
    }
    
    const values = [`${user.userId}`, `${user.question}`]
    
    pool.query(insertQuestionString, values)
        .then(Response => {
            res.status(200).send(Response.rows[0])
        })
        .catch(e => {
            res.status(400).send(e)
        })

}