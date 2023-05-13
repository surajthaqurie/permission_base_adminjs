import { IUser, IUserPasswordChange } from "../../interfaces";
import { prisma, paginated_query, generateSalt, generateHashPassword } from "../../utility";
const { users: Users } = prisma;

const getUsers = async (page: number, itemNo: number): Promise<IUser[]> => {
  const pagination_query = paginated_query(page, itemNo);

  let users = await Users.findMany({
    ...pagination_query,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return users;
};

const changePassword = async (userId: string, password: string): Promise<IUserPasswordChange> => {
  const salt = await generateSalt();
  const hash_password = await generateHashPassword(password, salt);
  const user = await Users.update({
    where: { id: userId },
    data: { password: hash_password },
    select: { id: true, email: true }
  });

  return user;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await Users.findFirst({
    where: {
      id: userId
    }
  });

  return user;
};

export const user_service = {
  getUsers,
  getUserById,
  changePassword
};
