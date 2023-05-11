import mongoose from 'mongoose';

class DbConfig {

    connect = (url: string) => {
        mongoose.connect(url)
            .then(() => console.info('DB connected successfully'))
            .catch(() => console.error('An error ocurred whily trying connect to the DB'));
    }
}

export default new DbConfig();