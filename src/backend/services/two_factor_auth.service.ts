import { prisma } from "../../utility";
import { IEnableDisableTwoFA, ITwoFA, ITwoFASetup } from "../../interfaces";

const { twoFactorAuthentication: TwoFactorAuth } = prisma;

const setupTwoFA = async (value: { userId: string; secret: string }): Promise<ITwoFASetup> => {
  let two_factor_auth;
  const user_exits = await TwoFactorAuth.findFirst({ where: { userId: value.userId } });
  if (user_exits) {
    two_factor_auth = await TwoFactorAuth.update({
      where: {
        id: user_exits.id
      },
      data: {
        secret: value.secret,
        status: false
      },
      select: {
        id: true,
        userId: true
      }
    });
  } else {
    two_factor_auth = await TwoFactorAuth.create({
      data: value,
      select: {
        id: true,
        userId: true
      }
    });
  }

  return two_factor_auth;
};

const verifyTwoFA = async (userId: string): Promise<ITwoFA | null> => {
  const auth_user = await TwoFactorAuth.findFirst({
    where: { userId }
  });

  return auth_user;
};

const enableTwoFA = async (id: string): Promise<IEnableDisableTwoFA> => {
  const enable_twoFA_user = await TwoFactorAuth.update({
    where: { id },
    data: { status: true },
    select: { id: true, userId: true, status: true }
  });

  return enable_twoFA_user;
};

const getTwoFAStatus = async (userId: string): Promise<ITwoFA | null> => {
  const two_fa_status = await TwoFactorAuth.findFirst({
    where: {
      userId,
      status: true
    }
  });

  return two_fa_status;
};

const disableTwoFA = async (id: string): Promise<IEnableDisableTwoFA> => {
  const disable_two_fa = await TwoFactorAuth.update({
    where: { id },
    data: {
      status: false
    },
    select: { id: true, userId: true, status: true }
  });

  return disable_two_fa;
};

export const two_fa_service = {
  setupTwoFA,
  verifyTwoFA,
  enableTwoFA,
  getTwoFAStatus,
  disableTwoFA
};
