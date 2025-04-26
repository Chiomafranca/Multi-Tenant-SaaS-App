const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, role, tenant } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    user = new User({ email, password: hashedPassword, role, tenant });
    await user.save();

    // Send response
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error during registration:", error); 
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and populate the tenant field
    const user = await User.findOne({ email }).populate('tenant');
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("User with populated tenant:", user);  // Log the full user object for debugging

    // Check if the tenant is populated
    if (!user.tenant) {
      return res.status(401).json({ message: "User does not belong to any tenant" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Ensure tenantId is correctly set
    const tenantId = user.tenant ? user.tenant._id.toString() : null;
    console.log("Tenant ID from user:", tenantId);  // Log tenantId for debugging

    // Create JWT token with tenantId included in the payload
    const token = jwt.sign(
      { userId: user._id, role: user.role, tenantId: tenantId },  // Correctly set tenantId
      process.env.SECRET_KEY,
      { expiresIn: '3h' }
    );

    // Send response with the token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};





module.exports = { registerUser, loginUser };
