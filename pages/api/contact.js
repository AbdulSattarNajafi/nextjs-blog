import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        // Getting data from request
        const { email, name, message } = req.body;

        // ServerSide Validation
        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        // Store the data in Database
        const newMessage = {
            name,
            email,
            message,
        };

        let client;

        const conncetionString = `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.p6maj3m.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

        try {
            client = await MongoClient.connect(conncetionString);
        } catch (error) {
            res.status(500).json({ message: 'Could not connect to database!' });
            return;
        }

        const db = client.db();

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message: 'Storing message failed!' });
            return;
        }

        client.close();

        res.status(201).json({ message: 'Successfully stored message!', message: newMessage });
    }
}

export default handler;
