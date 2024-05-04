import dbConnect from '../../utils/dbConnect';
import Project from '../../models/Project';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.aggregate([
          {
            $lookup: {
              from: 'projectdetails',
              localField: 'Clint',
              foreignField: 'Clint',
              as: 'details'
            }
          },
          {
            $unwind: '$details' // Unwind the details array
          },
          {
            $addFields: {
              title: '$details.title', // Copy title from projectdetails to title
              Category: '$details.Category', // Copy Category from projectdetails to Category
              image: '$details.image' // Copy image from projectdetails to image
            }
          },
          {
            $group: {
              _id: '$_id',
              details: { $push: '$details' }, // Re-group the details array
              title: { $first: '$title' }, // Keep the first title
              Category: { $first: '$Category' }, // Keep the first Category
              image: { $first: '$image' } // Keep the first image
            }
          }
        ]);
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    // Add cases for POST, PATCH, and DELETE if needed
    default:
      res.status(400).json({ success: false });
      break;
  }
}
