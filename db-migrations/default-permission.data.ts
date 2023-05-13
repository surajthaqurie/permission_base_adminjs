import { prisma } from "../src/utility";

const { resourcePermission: ResourcePermission, users: Users } = prisma;

export const createResourcePermission = async () => {
  const getUserId = await Users.findFirst({
    where: {
      role: "ADMIN"
    }
  });
  if (!getUserId) {
    console.log("Please migrate Super admin first");
    return;
  }
  const resource_permission_data = [
    /* User Table Permission */
    {
      resource_name: "User",
      read: true,
      write: true,
      update: true,
      delete: true,
      user_id: getUserId.id
    },
    /* Post Table Permission */
    {
      resource_name: "Post",
      read: true,
      write: true,
      update: true,
      delete: true,
      user_id: getUserId.id
    }
  ];

  await ResourcePermission.deleteMany({});
  await ResourcePermission.createMany({
    data: resource_permission_data
  });
};

createResourcePermission();
