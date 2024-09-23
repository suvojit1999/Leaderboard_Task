import express from 'express'
import mongoose from 'mongoose'
import('../DB/conn.js')
import userdata from '../model/userSchema.js'
import userHistory from '../model/userHistorySchema.js'


const router = express.Router()

//To get the data of all the users
router.get('/getData', async (req, res) => {
    const data = await userdata.find()
    res.json(data)
})


//To input new users (Although we are not gonna use it in the frontend side, because it is currently not needed)
router.post('/enterData', async (req, res) => {
    try {
        const { name, points } = req.body;
        const newUserData = new userdata({ name, points })
        const response = await newUserData.save()
        console.log(response)

        return res.status(200).json({ message: 'Upload successfully' });
    } catch (err) {
        console.error('Error saving user to the database:', err);
        return res.status(500).json({ error: 'Upload to database failed', details: err.message });
    }
})


//To generate random points from 0-10 for a perticular user, update that user's points in the database, add that to the history
router.get('/claimPoints/:id', async (req, res) => {
    const id = req.params.id;
    //const randNum = Math.floor(Math.random()*10 + 1) // to get number from 1-10
    const randNum = Math.floor(Math.random() * 11) // to get number from 0-10
    try {
        const response = await userdata.findByIdAndUpdate(id, { points: randNum }) //update points
        console.log(response)

        try {
            const users = await userdata.find().sort({ points: -1 }) //sort by points

            users.forEach(async (user, index) => {
                await userdata.findByIdAndUpdate(user._id, { rank: index + 1 }) //update ranks
            })


            try {
                const newUserHistory = new userHistory({ userid: id, points: randNum })
                const responseHistory = await newUserHistory.save()  //add to history

                console.log(responseHistory)
                return res.status(200).json({message: `Congratulations! ${randNum} Points are claimed`})

            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: "error updating the history. Try again." })
            }

        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "error updating the ranking. Try again." })
        }

    } catch (err) {
        console.error('Error updating points to the database:', err);
        return res.status(500).json({ error: 'Updating database failed, try again' });
    }


})


//get the history related to a perticular user
router.get('/getHistory/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const data = await userHistory.find({userid: id})
        const data2 = await userdata.find({_id: id})
        console.log(data)

        return res.json({ history: data, user: data2 })
    } catch(err){
        console.log(err)
        return res.status(500).json({error: "Error in fetching history"})
    }
})

export default router