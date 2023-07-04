const dotenv = require('dotenv');

// Load environment-specific variables
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
}else
{
    dotenv.config({ path: '.env.local' });
}

console.log("working env" , process.env.ENV);

export const config = {
    PORT : process.env.PORT ,
    DB_URL : process.env.DB_URL,
    JWT_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET,
    REFRESH_JWT_TOKEN_SECREAT  : process.env.REFRESH_JWT_TOKEN_SECREAT,
    AWS_KEY_ID : process.env.AWS_KEY_ID,
    AWS_SECRET_ACCESS_KEY : process.env.AWS_SECRET_ACCESS_KEY,
    REGION : process.env.REGION,
    BUCKET_NAME : process.env.BUCKET_NAME,
    BUCKET_URL : process.env.BUCKET_URL,
    MAIL : process.env.MAIL,
    MAIL_PASSWORD : process.env.MAIL_PASSWORD,
    SERVICE : process.env.SERVICE,
    FCM_KEY : process.env.FCM_KEY,
    BACKEND_URL : process.env.BACKEND_URL,
    ENV : process.env.ENV
}