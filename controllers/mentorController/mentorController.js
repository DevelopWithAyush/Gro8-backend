export const handleGetMentor = TryCatch(async (req, res, next) => {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
        return next(new ErrorHandler("Mentor not found", 404));
    }
    res.status(200).json(mentor);
})