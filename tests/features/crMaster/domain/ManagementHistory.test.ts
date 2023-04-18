import ManagementHistory from '../../../../src/features/crMaster/domain/class/ManagementHistory';

describe('Management History test', () => {
  it('should be able to create a new management history', async () => {
    //Given
    const data = [
      {
        phoneNumber: 900099138,
        length: 9,
        talkTime: 0,
        betterAttempt: '6.SIN INTENTO',
        betterAttemptValue: 0,
        totalManagement: 1,
        wrong: 0,
        deceased: 0,
        CD: 0,
        CNE: 0,
        NC: 1,
        betterManagement: 'NC',
        betterManagementDate: null,
      },
    ];
    //When

    const result = new ManagementHistory().transform(data);

    //Then
    expect(result).toEqual([
      {
        phoneNumber: 900099138,
        length: 9,
        talkTime: 0,
        betterAttempt: '6.sin intento',
        betterAttemptValue: 0,
        totalManagement: 1,
        wrong: 0,
        deceased: 0,
        CD: 0,
        CNE: 0,
        NC: 1,
        betterManagement: 'NC',
        betterManagementDate: null,
      },
    ]);
  });
});
