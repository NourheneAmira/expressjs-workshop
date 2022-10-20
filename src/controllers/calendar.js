const Calendar =require("../models/calendar");

exports.saveCalendar = (req, res, next) => {


    const calendar = new Calendar({
        title: req.body.title,
        date: req.body.date
    });

    calendar.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        status: true,
        data: calendar,
    });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

  //getAll calendar 
  exports.getfindAll =  (req, res) => {
    Calendar.find({}).exec(function(err, calendars) {
      if (err) {
        console.error("erreur");
      } else {

        res.json(calendars);
      }
    });
  }

  exports.getById = (req, res) => {
    Calendar.findById({ _id: req.params.id })
        .then((calendar) => {
            res.status(200).send(calendar)
        })
        .catch((error) => { console.log(error) });
}

exports.update = (req,res) => {
    Calendar.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
          .then((calendar) => {
              res.status(200).send(calendar)
          })
          .catch((error) => { console.log(error) });
}

exports.delete = (req, res) => {
    Calendar.findOneAndDelete({ _id: req.params.id })
          .then((data) => {
              res.status(200).json("Deleted...")
          })
          .catch((error) => { console.log(error) });
  }