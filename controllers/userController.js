export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received:", req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};
