import dbConnect from '../../utils/dbConnect';
import ProjectDetails from '../../models/ProjectDetails';

dbConnect();
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
}
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Check if there's an ID parameter in the query
        if (req.query.id) {
          const projectDetail = await ProjectDetails.findById(req.query.id);
          if (!projectDetail) {
            return res.status(404).json({ success: false, message: 'Project detail not found' });
          }
          return res.status(200).json({ success: true, data: projectDetail });
        }
        // If no ID is provided, return all project details
        const projectDetails = await ProjectDetails.find({});
        return res.status(200).json({ success: true, data: projectDetails });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    case 'POST':
      try {
        const { Client, Category, Location, Date, Link, title, description, image, otherImage } = req.body;
        const projectDetail = await ProjectDetails.create({ Client, Category, Location, Date, Link, title, description, image: image ? `data:image/jpeg;base64,${image}` : null, otherImage });
        return res.status(201).json({ success: true, data: projectDetail });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    // Add cases for PATCH and DELETE if needed
    default:
      return res.status(400).json({ success: false });
  }
}
