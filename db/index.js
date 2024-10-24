const mongoose=require("mongoose");

const userScheme = mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
    savedCourseData: { type: [[{faculty: String, facultySlot: [String]}]], default: [] },
    favourites: {type: [{TTdata: [{faculty: String, facultySlot: [String]}], courseNames: [String]}], default: []}
});

const User = mongoose.model("User", userScheme);

module.exports = {
    User
}