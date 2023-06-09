import Chapter from "../models/Chapter.js";

export default async (req, res, next) => {
  try {
    let one = await Chapter.findOne({ 
        order: req.body.order,
        manga_id:req.body.manga_id
    });
    if (!one) {
      return next();
    } else {
        return res.status(400).json({
          success: false,
          response: null,
          messages: ["Order already exists"],
        });
      } 
  } catch (error) {
    return next(error);
  }
};
