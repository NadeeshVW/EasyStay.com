import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage(); //we want to store any images that we get from the post request in memory
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

//api/my-hotels              //post request is going to acceptour form data
router.post(
  "/",
  verifyToken,   //so hat only logged in users can create hotels
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("PricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price/Night is required and must be a number"),
      body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    //   body("imageUrls").notEmpty().isArray().withMessage("Facilities are required"),

  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];   //get theimage file & all other properties that come along 
      const newHotel: HotelType = req.body;          // create a nw htel

      //1.upload the image to cloudinary.

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64"); //convert image to base 64 string
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises); //wait before giving the url for the images to get uploaded
      newHotel.imageUrls = imageUrls; //2.if upload was successfull, add the URLs tot he new hotel.
      newHotel.lastUpdate = new Date();
      newHotel.userId = req.userId;

      //3. save the new hotel in our database

      const hotel = new Hotel(newHotel);
      await hotel.save();

      //4. return a 201 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log("Error creating hotel", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;