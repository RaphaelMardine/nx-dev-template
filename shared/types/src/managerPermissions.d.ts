export interface managerPermissions {
  marketingPermission: {
    channelsAndCampaigns: boolean;
    cpmqlAndBillings: boolean;
    leadsAndPacks: boolean;
  };
  unitsPermission: {
    blockUnit: boolean;
    grantBonus: boolean;
    enableUnitsToTransition?: boolean;
    enableUnitsToInterestTransition?: boolean;
    grantPermissions?: boolean;
  };
  leadbrokerPermission: {
    deleteLead: boolean;
  };
  withdrawalPermission: {
    releaseDeposit: boolean;
  };
  salesPermission: {
    massBonus: boolean;
    cashBack: boolean;
  };
  refundPermission: {
    processRefund: boolean;
    cardOpeningId: boolean;
    termsId: boolean;
  };
  userPermission: {
    createUser: boolean;
    updatePermissionsUser: boolean;
    deleteUser: boolean;
  };
}
