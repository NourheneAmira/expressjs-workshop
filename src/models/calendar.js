const {Schema, model} = require("mongoose")

const calendarSchema = new Schema({
    title:{
        type:String, required:true
    },
    date:{
        type:Date, required:true
    },

    // salle: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Salle',
    //     trim: true
    // },

    // etudiant: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Etudiant',
    //     trim: true
    //   }],

    // formateur: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Formateur',
    //     trim: true
    // }]
});

module.exports = model("Calendar", calendarSchema);