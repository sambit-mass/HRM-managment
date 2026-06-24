import UserModel from "../Models/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const CreateUser = async (req, res) => {
    let data = req.body;

    // ✅ If called from public /signup route, force role to EMPLOYEE
    //    so no one can self-register as HR
    if (!req.user) {
        data.role = "EMPLOYEE";
    }

    try {
        let user = await UserModel.findOne({ email: data?.email })
        if (user) {
            return res.status(400).send({ err: "This Employee Already Exist" })
        }
        if (!data.password) {
            return res.status(400).send({ err: "Password Required" });
        }
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(data.password, salt);
        data.password = hash;

        let UserData = await new UserModel(data).save()
        res.status(201).send({ res: "Employee Id Created" })
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
}

export const GetAllUsers = async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.status(201).send({ data: user })
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
}

export const GetuserById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await UserModel.findById(id)
        res.status(201).send({ data })
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
}

export const DeleteuserById = async (req, res) => {
    const { id } = req.params;
    try {
        let data = await UserModel.findByIdAndDelete(id)
        res.status(201).send({ res: "Employee Deleted Successfully" })
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
}

export const UpdateUserById = async (req, res) => {
    const { id } = req.params
    const data = req.body
    delete data.email
    try {
        let result = await UserModel.findByIdAndUpdate(id, data)
        res.status(201).send({ res: "Employee updated Successfully" })
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
}

export const UserLogin = async (req, res) => {
    const data = req.body
    if (!data.email) {
        return res.status(400).send({ err: "Email required" });
    }
    if (!data.password) {
        return res.status(400).send({ err: "Password required" });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
        return res.status(400).send({ err: "Enter valid email" });
    }
    try {
        let user = await UserModel.findOne({ email: data.email })
        if (!user) {
            return res.status(500).send({ err: "Email doesn't exist" });
        }
        let checkpassword = bcrypt.compareSync(data.password, user.password)
        if (!checkpassword) {
            return res.status(401).send({ err: "Incorrect Password" });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role },
            process.env.JWT_TOKEN,
            { expiresIn: "8h" }
        )
        res.send({ token, user })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal server error" });
    }
}
