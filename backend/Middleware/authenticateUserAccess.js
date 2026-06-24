import jwt from "jsonwebtoken";

export const authenticateUserAccess = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format. Use: Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decodedUser;

    next();
  } catch (err) {
    console.error("Authentication Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const CheckRoleAccess = (currentRole, allowedRoles) => {
  return allowedRoles.includes(currentRole);
};

export const checkRoleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const currentRole = req.user.role;

    if (CheckRoleAccess(currentRole, allowedRoles)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access denied. You don't have permission.",
    });
  };
};
