import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: JwtPayload; // The decoded JWT payload will be assigned to the user
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // Assign the decoded JWT payload to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
