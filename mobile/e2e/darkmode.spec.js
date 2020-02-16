describe('ezeCBT', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('darkmode::navigate to config and switch to darkmode', async () => {
    const config = element(by.id('tabBar_icon2'));
    await expect(config).toBeVisible();
    config.tap();

    const consent = element(by.id('config_consent_yes'));
    await expect(consent).toNotExist();

    const darkmode = element(by.id('config_darkmode'));
    await expect(darkmode).toBeVisible();
    darkmode.tap();
  });
});
