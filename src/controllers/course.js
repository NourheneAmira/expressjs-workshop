import Course from '../models/Course'

const getAllCourses =  async (_req, res) => {
    const courses = await Course.find()    
    return res.send(courses)
}

const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id)
    
    return res.json(course)
}

const addCourse = async (req, res) => {
    let course = await Course.create({
        title: req.body.title,
        teaser: req.body.teaser,
        description: req.body.description,
        rating: req.body.rating,
        price: req.body.price,
        totalNumberOfHours: req.body.totalNumberOfHours,
        teacher: req.body.teacher,
    })
   
    return res.send(course)
}

const updateCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(
     req.params.id,
     {  
        title: req.body.title,
        teaser: req.body.teaser,
        description: req.body.description,
        rating: req.body.rating,
        price: req.body.price,
        totalNumberOfHours: req.body.totalNumberOfHours,
        teacher: req.body.teacher,
     },
     {
      new: true,
     }
    )
   
    if (!course)
     return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
    })

    return res.send(course)
} 


const deleteCourse = async (req, res) => {
    // find an delete the data using moongoose & mongodb
    const {id} = req.params
    const deletedCourse = await Course.findByIdAndRemove(id)
   
    if (!deletedCourse)
     return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
     })
   
    // finally response send with deleted data
    return res.json({
     success: true,
     data: deletedCourse,
     message: 'Delete successful!',
    })
}


export { getAllCourses, getCourseById, addCourse, deleteCourse, updateCourse }