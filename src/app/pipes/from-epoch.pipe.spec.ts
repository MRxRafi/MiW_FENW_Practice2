import { FromEpochPipe } from './from-epoch.pipe';

describe('FromEpochPipe', () => {
  it('create an instance', () => {
    const pipe = new FromEpochPipe();
    expect(pipe).toBeTruthy();
  });
});
