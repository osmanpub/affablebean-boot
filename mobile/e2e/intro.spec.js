describe('ezeCBT', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('intro slider::swipe left', async () => {
    const intro = element(by.id('app_intro_modal'));
    intro.swipe('left');
  });

  it('intro slider::press the skip and done button', async () => {
    const intro = element(by.id('app_intro_modal'));

    const skip = element(by.text('Skip'));
    skip.tap();

    const done = element(by.text('Done'));
    done.tap();
  });
});
