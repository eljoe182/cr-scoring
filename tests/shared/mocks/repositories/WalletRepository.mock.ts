export const mockWalletRepository = {
  getAllWallets: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'MAF_TRAMO 2 Y 3',
      code: 'MAF_T2T3',
      status: 1,
      provId: 1,
      typeId: 1,
    },
  ]),
};
