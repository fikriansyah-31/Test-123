const { Quote } = require("../../models")

// get quotes
exports.getQuotes = async (req, res) => {
    try {
        const quote = await Quote.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt","isfavorite"]
            }
        });
        res.status(200).send({
            status: "Success",
            message: "Get quotes success",
            quote,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Get data Failed",
            message: "Server Error",
        });
    }
}

// tambah quote
exports.addQuotes = async (req, res) => {
    try {
        let newQuotes = await Quote.create(req.body);

        res.status(200).send({
            status: "Success",
            message: "Add Category Success",
            data: {
                category: {
                    id: newQuotes.id,
                    quote: newQuotes.quote,
                    isfavorite:true
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Add Quote Failed",
            message: "Server Error",
        });
    }
};

exports.getDetailQuotes = async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await Quote.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(200).send({
            status: "Success",
            message: `Get detail quote id: ${id} success`,
            data: {
                Quote: quote,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Get detail data failed",
            message: "Server Error",
        });
    }
};
exports.updateQuotes = async (req, res) => {
    const { id } = req.params;

    try {
        const data = req.body
        console.log(data)
        let updateQuotes = await Quote.update({
            ...data
        },
            { where: { id } }
        );

        console.log(updateQuotes)

        res.status(200).send({
            status: "Success",
            message: `Update category at id: ${id} success`,
            data: {
                Quote: {
                    id: id,
                    isfavorite: data.isfavorite
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Updated quote failed",
            message: "Server Error",
        });
    }
};
exports.deleteQuotes = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Quote.destroy({
            where: { id },
        });

        console.log(data)

        res.status(200).send({
            status: "Success",
            message: `Delete quote: ${id} success`,
            data: {
                id: { id }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: "Delete quote failed",
            message: "Server Error",
        });
    }
};
