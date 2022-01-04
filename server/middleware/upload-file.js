import { upload } from '../helpers/file-helpers.js';

export const upLoadFile = async (req, res) => {
    try {
        const { imgFile, id, name } = req.body;
        if (!req.file) {
            return upload.none();
        } else {
            return upload.single('imgFile');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
