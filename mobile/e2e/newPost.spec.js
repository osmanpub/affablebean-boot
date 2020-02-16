describe('ezeCBT', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('newPost::open modal and create post', async () => {
    const new_post = element(by.id('cbt_new_post'));
    await expect(new_post).toBeVisible();
    new_post.tap();

    const automatic = element(by.id('auto_auto'));
    await expect(automatic).toBeVisible();
    await automatic.typeText('This is a negative, distorted thought.');
    automatic.swipe('left');

    const distortion = element(by.id('dist_allOrNothing'));
    await expect(distortion).toBeVisible();
    distortion.tap();

    const distTitle = element(by.id('dist_title'));
    await expect(distTitle).toBeVisible();
    distTitle.swipe('left');

    const challenge = element(by.id('rest_chal'));
    await expect(challenge).toBeVisible();
    await challenge.typeText(
      'This is a challenge to the negative, distorted thought.',
    );

    const scrollRest = element(by.id('diary_scroll_rest'));
    await scrollRest.scrollTo('bottom');

    const alternative = element(by.id('rest_alt'));
    await expect(alternative).toBeVisible();
    await alternative.typeText(
      'This is a postive rebuttal of the negative, distorted thought.',
    );

    const save = element(by.id('rest_save'));
    await expect(save).toBeVisible();
    save.tap();
  });
});
