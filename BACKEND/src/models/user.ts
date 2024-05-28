//Represent user document in mongodb database

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//type, intellisense, help us 
export type UserType = {
    _id: string;
    email: string;
    password: string;
    lastName: string;
}

//schema
const userSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true },
    password: { type: String, required : true, },
    firstName: { type: String, required : true, },
    lastName: { type: String, required : true, },
});

/*using bcrypt to encrypt the password
this is the middleware fr mngodb
tells before any update to the document gets saved 
want to check if the pasword has changed,if changed
then want to bcrypt to hash it and then we call the next function
@- pre-save hook is used-means function will run before it is saved to the database
8-salt round for hashing, higher the number hgher is the hashing round
*/
userSchema.pre("save", async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model<UserType>("user", userSchema);

export default User