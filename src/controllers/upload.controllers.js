const uploadFiles = async (req, res) => {
    const paths = req.files.map((e) => e.path)
    if (req.files) {
        return res.status(200).json(paths)
    }
    return res.status(500).send('Error al cargar los archivos')
}

module.exports = {
    uploadFiles
}
