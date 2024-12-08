import{device, element, by}from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('should show select pocket', async () => {
    await element(by.text('คอมใหม่')).tap();
    await expect(element(by.text('15000฿'))).toBeVisible();
  });
});
