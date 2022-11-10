const { User } = require("../../models")

const joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register 
exports.register = async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).required(),
        email: joi.string().email().min(3).required(),
        password: joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            }
        })
    }

    try {


        // Hashed pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Tambah User
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
            console.log(newUser);
        //Token
        
        const token = jwt.sign({ id: newUser.id}, process.env.TOKEN_KEY);

        res.status(201).send({
            status: "Success",
            message: "Register Success",
            data: {
                username: newUser.username,
                email: newUser.email,
                token,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
          status: "Failed",
          message: "Server Error",
        });
    }
}

// ============== LOGIN ==============
exports.login = async (req, res) => {
    //Validation
    const schema = joi.object({
      email: joi.string().min(5).required(),
      password: joi.string().min(3).required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      res.status(400).send({
        message: error.details[0].message,
      });
    }
  
    try {
      // Json Web Token
      const token = jwt.sign({ id: User.id }, process.env.TOKEN_KEY);
  
      res.status(200).send({
        status: "Success",
        message: "Berhasil Login",
        data: {
            username: User.username, 
            email: User.email,
            status: User.status,
            token,
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Failed",
        message: "Server Error",
      });
    }
  };
